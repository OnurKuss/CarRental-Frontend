import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCart } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44326/api/";

  getAllByCustomerId(customerId:number):Observable<ListResponseModel<CreditCart>>{
    let newPath= this.apiUrl+ "CreditCard/getallbycustomerid?customerid="+customerId;
    return this.httpClient.get<ListResponseModel<CreditCart>>(newPath);
  }
  getById(id:number):Observable<ListResponseModel<CreditCart>>{
    let newPath=this.apiUrl+ "CreditCard/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<CreditCart>>(newPath);
  }
  getAll():Observable<ListResponseModel<CreditCart>>{
    let newPath=this.apiUrl+ "CreditCard/getall";
    return this.httpClient.get<ListResponseModel<CreditCart>>(newPath);
  }
  add(creditCard:CreditCart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"CreditCard/add",creditCard);
  }
  delete(creditCard:CreditCart):Observable<SingleResponseModel<CreditCart>>{
    return this.httpClient.post<SingleResponseModel<CreditCart>>(this.apiUrl+"CreditCard/delete" , creditCard);
  }

}
