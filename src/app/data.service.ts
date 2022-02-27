import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: any;
  constructor(private http : HttpClient) {
    this.url = 'http://51.68.124.123:8080/dev.fouta.store_pro-api-v1-0.1/';
  }
 post(endpoint: string, body: any, option?: any) {
    return this.http.post(this.url + '' + endpoint, body, option);
  }
}
