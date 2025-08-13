import { TextDetectionForm } from "../schema";
import * as yup from "yup";

export type TextDetectionFormTypes = yup.InferType<typeof TextDetectionForm>;

export type TextApiResponse = {
  text: string;
  creator: string;
  probability: string;
  perplexity: string;
  threshold: string;
  domain: string;
  method: string;
};
