import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carImages:CarImage[]=[]

  constructor(private carImageService:CarImageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
       if(params["carId"]){
         this.getCarImageByCarId(params["carId"])
       }else{
         this.getCarImage()
       }
    })
    
  }
   getCarImage(){
     this.carImageService.getCarImages().subscribe(response=>{
          this.carImages=response.data
     })
   }

   getCarImageByCarId(carId:number){
     this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
       this.carImages=response.data
     })
   }

   getImageSource(carImage:CarImage):string{
     let url:string="https://localhost:44326/"+carImage.imagePath
     return url
   }
}
