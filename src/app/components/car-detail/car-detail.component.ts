import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail:CarDetail[]

  constructor(
    private carService:CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      
        this.getCarDetailByCarId(params['carId'])
      
    })
  }

  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailByCarId(carId).subscribe((response=>{
    this.carDetail=response.data;
    console.log(this.carDetail)
    }))
  }
  
}
