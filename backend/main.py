from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import numpy as np
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, GPT2LMHeadModel, GPT2TokenizerFast
from datasets import Dataset

device = "cuda" if torch.cuda.is_available() else "cpu"

app = FastAPI()

# Allow all origins (for testing)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body
class FormText(BaseModel):
    text: str
    method: str


# -----------------------------
# Direct Classification Method
# -----------------------------
model_roberta_direct = AutoModelForSequenceClassification.from_pretrained(
    "rajendrabaskota/ai-human-classification-hc3-wiki-recleaned-dataset-max-length-512"
)
tokenizer_roberta_direct = AutoTokenizer.from_pretrained(
    "rajendrabaskota/ai-human-classification-hc3-wiki-recleaned-dataset-max-length-512"
)
trainer_roberta_direct = Trainer(model=model_roberta_direct, tokenizer=tokenizer_roberta_direct)


# -----------------------------
# Perplexity Score Method
# -----------------------------
model_gpt = GPT2LMHeadModel.from_pretrained("gpt2-medium")
tokenizer_gpt = GPT2TokenizerFast.from_pretrained("gpt2-medium")
best_threshold = 12.80


# -----------------------------
# Domain Classification Method
# -----------------------------
model_roberta = AutoModelForSequenceClassification.from_pretrained(
    "rajendrabaskota/hc3-wiki-domain-classification-roberta"
)
tokenizer_roberta = AutoTokenizer.from_pretrained(
    "rajendrabaskota/hc3-wiki-domain-classification-roberta"
)
trainer_roberta = Trainer(model=model_roberta, tokenizer=tokenizer_roberta)

id2label = model_roberta.config.id2label
label2id = model_roberta.config.label2id


# -----------------------------
# Helper Functions
# -----------------------------
mean_perplexity_thresholds = {
    'wiki-intro': 17.037818272053986,
    'hc3-reddit_eli5': 37.542010707390865,
    'hc3-finance': 21.99415380294649,
    'hc3-open_qa': 15.945459363412963,
    'hc3-medicine': 31.609027446121782,
    'hc3-wiki_csai': 13.921098830997943
}

def compute_perplexity_score(text):
    max_length = 64
    stride = 32
    encodings = tokenizer_gpt(text, return_tensors="pt")
    seq_len = encodings.input_ids.size(1)
    nlls = []
    prev_end_loc = 0

    for begin_loc in range(0, seq_len, stride):
        end_loc = min(begin_loc + max_length, seq_len)
        trg_len = end_loc - prev_end_loc
        input_ids = encodings.input_ids[:, begin_loc:end_loc]
        target_ids = input_ids.clone()
        target_ids[:, :-trg_len] = -100

        with torch.no_grad():
            outputs = model_gpt(input_ids, labels=target_ids)
            neg_log_likelihood = outputs.loss
        nlls.append(neg_log_likelihood)
        prev_end_loc = end_loc
        if end_loc == seq_len:
            break

    perplexity = torch.exp(torch.stack(nlls).mean())
    return float(perplexity.cpu().detach().numpy())

def find_domain(text):
    tokenized = tokenizer_roberta(text, return_tensors="pt")
    tokenized = Dataset.from_dict(tokenized)
    prediction, _, _ = trainer_roberta.predict(tokenized)
    return np.argmax(prediction, axis=-1)[0]

def direct_classification(text):
    tokenized = tokenizer_roberta_direct(text, return_tensors="pt")
    tokenized = Dataset.from_dict(tokenized)
    prediction, _, _ = trainer_roberta_direct.predict(tokenized)
    return prediction[0]


# -----------------------------
# API Endpoints
# -----------------------------
@app.get("/")
def home():
    return "Wassupp!!"

@app.get("/get-methods")
def get_methods():
    return [
        {"label": "Perplexity", "value": "perplexity"},
        {"label": "Direct", "value": "direct"},
        {"label": "Domain Classification", "value": "domain_classification"},
    ]

@app.post("/analyze-text")
def submit_text(item: FormText):
    text = item.text
    method = item.method
    result = ""
    probability = 0
    perplexity = 0
    threshold = 0
    domain = ""

    if method == "domain_classification":
        perplexity = compute_perplexity_score(text)
        domain = id2label[find_domain(text)]
        threshold = mean_perplexity_thresholds.get(domain, best_threshold)
        logits = direct_classification(text)
        probability = np.exp(logits) / sum(np.exp(logits))
        prediction = np.argmax(probability, axis=-1)
        probability = probability[prediction]
        result = "Human crafted" if prediction == 0 else "AI generated"

    elif method == "perplexity":
        perplexity = compute_perplexity_score(text)
        threshold = best_threshold
        logits = direct_classification(text)
        probability = np.exp(logits) / sum(np.exp(logits))
        prediction = np.argmax(probability, axis=-1)
        probability = probability[prediction]
        result = "Human crafted" if prediction == 0 else "AI generated"

    elif method == "direct":
        logits = direct_classification(text)
        probability = np.exp(logits) / sum(np.exp(logits))
        prediction = np.argmax(probability, axis=-1)
        probability = probability[prediction]
        result = "Human crafted" if prediction == 0 else "AI generated"

    return {
        "result": {
            "creator": result,
            "probability": str(probability),
            "perplexity": str(perplexity),
            "threshold": str(threshold),
            "domain": domain,
            "method": method,
            "text": text
        }
    }
