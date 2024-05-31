import { API } from "../base";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  accessToken: string;
}

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<any, RegisterCredentials>({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
