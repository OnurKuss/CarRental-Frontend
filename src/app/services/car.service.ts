import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44326/api/";

  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getcardetails" 
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath= this.apiUrl+"cars/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarDetailByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarDetailsWithBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getbycolorid&brandid?colorId="+colorId+"&brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarDetailByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getCarDetailbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getbycarid?id="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
}
