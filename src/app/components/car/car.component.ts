import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded=false;
  currentCar:CarDetail
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarDetailsByBrand(params["brandId"])
        
      }else if(params["colorId"]){
        this.getCarDetailsByColor(params["colorId"])
      }else{
        this.getCarDetails()
      }
    })
    
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  getCarDetailsByBrand(brandId:number){
     this.carService.getCarDetailsByBrand(brandId).subscribe(response=>{
       this.carDetails=response.data;
       this.dataLoaded=true;
     })
  }
  getCarDetailsByColor(colorId:number){
    this.carService.getCarDetailByColor(colorId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true
    })
  }

  setCurrentCar(car:CarDetail){
    this.currentCar=car
  }

  getCurrentCar(car:CarDetail){
     if(car==this.currentCar){
       return "list-group-item active"
     }else{
       return "list-group-item"
     }
  }
}
