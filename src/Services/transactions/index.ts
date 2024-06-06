import { API } from "../base"

export interface Transaction {
  _id: string
  amount: number
  currency: string
  type: string
  category: string
  note: string
  transactionDateTime: string
}

const transactionApi = API.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.mutation<Transaction[], void>({
      query: (credentials) => ({
        url: "/transactions",
        method: "GET",
      }),
    }),
    postTransactions: build.mutation<Transaction, Omit<Transaction, '_id'>>({
      query: (credentials) => ({
        url: "/transactions",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteTransactions: build.mutation<Pick<Transaction, '_id'>, string>({
      query: (credentials) => ({
        url: "/transactions/" + credentials,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetTransactionsMutation,
  usePostTransactionsMutation,
  useDeleteTransactionsMutation,
} = transactionApi