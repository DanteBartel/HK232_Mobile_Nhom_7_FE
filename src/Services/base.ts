import { Config } from "@/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: Config.API_URL });

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const token = await AsyncStorage.getItem("@token");
  let modifiedArgs: FetchArgs = typeof args === "string" ? { url: args } : args;

  modifiedArgs.headers = {
    ...modifiedArgs.headers,
    Authorization: `Bearer ${token}`,
  };

  const result = await baseQuery(modifiedArgs, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
