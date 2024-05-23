import { API } from "../base";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    viewProfile: build.query<User, void>({
      query: () => "auth/viewProfile",
    }),
  }),
  overrideExisting: true,
});

export const { useViewProfileQuery, useLazyGetUserQuery } = userApi;
