import axios from "axios";
import { Place } from "~types";

export const getSearchPlaces = async (payload: Record<string, string>) => {
  return axios.post<Place[]>("places/search", payload);
};
