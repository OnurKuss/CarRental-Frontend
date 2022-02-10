import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import {RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath=this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  addForRental(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+'rentals/add'
    return this.httpClient.post<ResponseModel>(newPath ,rental)
  }

  getRentalByCarId(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath=this.apiUrl+"Rentals/getRentalByCarId?id="+carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath)
  }
}
