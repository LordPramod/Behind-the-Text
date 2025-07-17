import { useMutation } from "@tanstack/react-query";
import { analyzeText, TEXT_ANALYZE_ENDPOINT } from "../api";
import { toaster } from "college-project/app/shared/config";

export const useSendTextToAnalyze = () => {
  return useMutation({
    mutationKey: [TEXT_ANALYZE_ENDPOINT.ANALYZE],
    mutationFn: analyzeText,
    onSuccess: (data) => data?.result,
    onError: (err) => {
      toaster.create({
        title: err?.message,
        closable: true,
        type: "error",
      });
    },
  });
};
