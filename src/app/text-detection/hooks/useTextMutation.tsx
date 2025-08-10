import { useMutation } from "@tanstack/react-query";
import { analyzeText, TEXT_ANALYZE_ENDPOINT } from "../api";

export const useSendTextToAnalyze = () => {
  return useMutation({
    mutationKey: [TEXT_ANALYZE_ENDPOINT.ANALYZE],
    mutationFn: analyzeText,
    onSuccess: (data) => data?.result,
    onError: (err) => {
      console.error("Text analysis failed:", err?.message);
    },
  });
};
