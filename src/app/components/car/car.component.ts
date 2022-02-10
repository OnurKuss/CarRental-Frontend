import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[]
  dataLoaded = false;
  currentCar: CarDetail;
  filterCar = '';

  brandId:number=0
  colorId:number=0

  brands: Brand[];
  colors: Color[];

  carImages: CarImage[]

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private carImageService:CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColor(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
    this.getBrandList();
    this.getColorList();
    this.resetItems()
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.toastrService.info('Araba Detayı');
    });
  }
  getCarDetailsByBrand(brandId: number) {
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByColor(colorId: number) {
    this.carService.getCarDetailByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getBrandList() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColorList() {
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data;
    })
  }

  getCarsWithBrandAndColor(){
    if(this.brandId == 0 && this.colorId ==0){
      this.getCarDetails()
    }
    else if(this.brandId == 0){
      this.getCarDetailsByColor(this.colorId)
    }
    else if(this.colorId == 0){
      this.getCarDetailsByBrand(this.brandId)
    }
    else{
      this.carService.getCarDetailsWithBrandAndColor(this.brandId,this.colorId).subscribe((response)=>{
        this.carDetails=response.data
      })
    }
  }

  resetItems(){
    this.brandId=0
    this.colorId=0
  }

  
}
