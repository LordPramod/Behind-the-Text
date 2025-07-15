import axios from "axios";
import { TEXT_ANALYZE_ENDPOINT } from "./Url";

export const analyzeText = async (data: { text: string; method: string }) => {
  const response = await axios.post(
    TEXT_ANALYZE_ENDPOINT.ANALYZE,
    {
      text: data.text,
      method: data.method, // Ensure method is included in the request
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
