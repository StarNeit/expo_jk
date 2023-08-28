import { getSearchPlaces } from "~services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Place } from "~types";

export const useSearchPlaces = (
  data: Record<string, string>
): {
  query: UseQueryResult<AxiosResponse<Place[]>>;
  places?: Place[];
} => {
  const query = useQuery({
    queryKey: [data, "getSearchPlaces"],
    queryFn: ({ queryKey }) =>
      getSearchPlaces(queryKey[0] as Record<string, string>),
  });

  return {
    query,
    places: query.data?.data,
  };
};
