import { useQuery } from "@tanstack/react-query";
import { TEXT_ANALYZE_ENDPOINT } from "../api";
import axios from "axios";
import { SelectOptionType } from "college-project/app/shared/types/form/select";

export const useGetMethods = () => {
  const getMethods = () => {
    return axios.get<SelectOptionType[]>(TEXT_ANALYZE_ENDPOINT.GET_METHODS);
  };
  return useQuery({
    queryKey: [TEXT_ANALYZE_ENDPOINT.GET_METHODS],
    queryFn: getMethods,
    select: (data) => data?.data,
  });
};
