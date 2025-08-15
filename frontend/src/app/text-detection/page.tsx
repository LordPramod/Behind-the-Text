"use client";
import { useState } from "react";
import PromptComponent from "./Test";
import { Icons } from "@/components/icons";
import { useSendTextToAnalyze, useTextAnalyzeFrom } from "./hooks";
import { FormProvider } from "../shared";
import { TextDetectionFormTypes } from "./types";

type AIResponse = {
  creator: string;
  probability: string;
  method: string;
  domain: string;
  perplexity: string;
  threshold: string;
} | null;

const TextDetection = () => {
  const [userPrompts, setUserPrompts] = useState<string[]>([]);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const { methods } = useTextAnalyzeFrom();
  const { mutateAsync } = useSendTextToAnalyze();

  const onSubmit = (formData: TextDetectionFormTypes) => {
    setUserPrompts((prev) => [...prev, formData.text]);

    setAiResponses((prev) => [...prev, null]);

    mutateAsync(formData, {
      onSuccess: (data) => {
        setAiResponses((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = data?.result;
          return updated;
        });
      },
      onError: () => {
        setAiResponses((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            creator: "Error",
            probability: "-",
            method: "-",
            domain: "-",
            perplexity: "-",
            threshold: "-",
          };
          return updated;
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen p-4 bg-[#0e0024]">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Icons.logo className="size-16 h-auto" />
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,0.5))] leading-tight">
            Reveal The True
          </h1>
          <h2 className="text-3xl font-normal text-[#b894ff] leading-tight">
            Writer.
          </h2>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col gap-4">
          {userPrompts.map((prompt, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* User Prompt - Right */}
              <div className="self-end max-w-[75%] px-4 py-3 rounded-xl bg-gradient-to-b from-[#8c45ff]/80 to-[#4a208a]/80 text-white shadow-[0px_0px_12px_#8c45ff]">
                {prompt}
              </div>

              <div className="self-start max-w-[75%] min-h-[80px] px-4 py-3 rounded-xl bg-gradient-to-b from-[#0e0036] to-[#1c0b4d] text-white shadow-[0px_0px_12px_#b894ff] relative flex justify-center items-center">
                {aiResponses[index] ? (
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">Creator:</span>{" "}
                      {aiResponses[index].creator}
                    </p>
                    <p>
                      <span className="font-semibold">Probability:</span>{" "}
                      {aiResponses[index].probability}
                    </p>
                    <p>
                      <span className="font-semibold">Perplexity:</span>{" "}
                      {aiResponses[index].perplexity}
                    </p>
                    <p>
                      <span className="font-semibold">Threshold:</span>{" "}
                      {aiResponses[index].threshold}
                    </p>
                    <p>
                      <span className="font-semibold">Domain:</span>{" "}
                      {aiResponses[index].domain || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Method:</span>{" "}
                      {aiResponses[index].method}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-b from-[#8c45ff] to-[#4a208a] shadow-[0px_0px_12px_#b894ff]">
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <PromptComponent methods={methods} />
        </FormProvider>
      </div>
    </div>
  );
};

export default TextDetection;
