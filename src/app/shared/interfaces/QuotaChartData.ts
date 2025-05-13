import { QuotaLite } from "./Quota"

export interface QuotaSeries {
  series: string,
  quotas: QuotaLite[]
}
