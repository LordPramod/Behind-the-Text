import axios from "axios";
import { TEXT_ANALYZE_ENDPOINT } from "./Url";
import { TextApiResponse } from "../types";

export const analyzeText = async (data: { text: string; method: string }) => {
  const response = await axios.post<{ result: TextApiResponse }>(
    TEXT_ANALYZE_ENDPOINT.ANALYZE,
    {
      text: data.text,
      method: data.method,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data;
};
