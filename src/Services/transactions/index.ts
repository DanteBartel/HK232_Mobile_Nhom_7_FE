import { DateTime } from "i18n-js"

export interface Transaction {
  id: number
  amount: number
  currency: string
  type: string
  category: string
  note: string
  transactionDateTime: string
}