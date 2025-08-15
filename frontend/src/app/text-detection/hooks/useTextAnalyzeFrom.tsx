import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextDetectionForm } from "../schema";
import { TextDetectionFormTypes } from "../types";
export const useTextAnalyzeFrom = () => {
  const methods = useForm<TextDetectionFormTypes>({
    resolver: yupResolver(TextDetectionForm),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });
  return { methods };
};
