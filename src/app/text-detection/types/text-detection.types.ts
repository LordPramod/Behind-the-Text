import { TextDetectionForm } from "../schema";
import * as yup from "yup";

export type TextDetectionFormTypes = yup.InferType<typeof TextDetectionForm>;
