import { useQuery } from "@tanstack/react-query";
import { TEXT_ANALYZE_ENDPOINT } from "../api";
import axios from "axios";

export const useGetMethods = () => {
  const getMethods = () => {
    return axios.get<any[]>(TEXT_ANALYZE_ENDPOINT.GET_METHODS);
  };
  return useQuery({
    queryKey: [TEXT_ANALYZE_ENDPOINT.GET_METHODS],
    queryFn: getMethods,
    select: (data) => data?.data,
  });
};
