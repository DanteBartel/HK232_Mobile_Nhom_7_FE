import { API } from "../base";

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface AuthResponse {
    accessToken: string,
}

const authApi = API.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            })
        })
    }),
    overrideExisting: true,
})

export const { useLoginMutation } = authApi