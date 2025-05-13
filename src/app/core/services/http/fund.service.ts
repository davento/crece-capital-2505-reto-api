import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Fund, FundLite } from "../../../shared/interfaces/Fund";
import { firstValueFrom } from "rxjs";
import { QuotaLite, QuotaResponse } from "../../../shared/interfaces/Quota";

@Injectable({
  providedIn: 'root'
})
export class FundService{
  API_URL = environment.API_URL + "/real_assets";
  // only the funds that are being asked for
  fund_ids = [15077, 188, 187, 186];

  constructor(private http: HttpClient) {}

  async getFundTypes(): Promise<FundLite[]> {
    let funds = [];
    for (let id of this.fund_ids) {
      const id_url = `${this.API_URL}/${id}`;
      let id_info: Fund = await firstValueFrom(this.http.get<Fund>(id_url));
      funds.push({
        id: id_info["data"]["id"],
        name: id_info["data"]["attributes"]["name"]
      });
    }
    return funds;
  }

  async getQuotas(id: string, date_start: string, date_end: string): Promise<QuotaLite[]>{
    const quotas_url = `${this.API_URL}/${id}/days?from_date=${date_start}&to_date=${date_end}`;
    const response: QuotaResponse = await firstValueFrom(this.http.get<QuotaResponse>(quotas_url));
    const quotas_data = response.data;
    const quotas: QuotaLite[] = quotas_data.map(quota => ({
      id: quota.id,
      date: quota.attributes.date,
      price: quota.attributes.price,
    }));
    return quotas;
  }
}
