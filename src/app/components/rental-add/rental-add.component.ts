import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder, 
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router
    ) { }

  rentalAddForm:FormGroup;
  car:Car

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getByCarId(params["carId"]);
      }
    })
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  addRental(){
    if(this.rentalAddForm.valid){
      let rentalModel=Object.assign({carId:this.car.carId,customerId:2002},this.rentalAddForm.value)
      console.log(rentalModel)
       this.rentalService.addForRental(rentalModel).subscribe(response=>{
         this.toastrService.success(response.message,"Başarılı")
         this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz")
         this.router.navigate(["payment/car/"+this.car.carId])
       },responseError=>{
         console.log(responseError)
         if(responseError.error.success===false){
           this.toastrService.error(responseError.error.message,"Dikkat")
         }
         else if(responseError.error.ValidationErrors.length>0){
           for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası") 
           }
         }
         
       });
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

  getByCarId(carId:number){
    this.carService.getByCarId(carId).subscribe(response=>{
      this.car=response.data
    })
  }

}
