import { API } from "../base";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
