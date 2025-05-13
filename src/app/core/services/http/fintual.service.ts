import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Fund } from "../../../shared/interfaces/Fund";

@Injectable({
  providedIn: 'root'
})
export class FintualService{
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getFundTypes() {
    // TODO: filter only the fund types we were asked for
    const url = this.API_URL;
    return this.http.get<Fund[]>(url); // replace this by any if too tough
  }
}
