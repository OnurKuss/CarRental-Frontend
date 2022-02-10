import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCart } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCartService } from 'src/app/services/credit-cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor
  (
    private formBuilder:FormBuilder,
    private carService:CarService,
    private rentalService:RentalService,
    private creditCardService:CreditCartService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  creditCardAddForm:FormGroup
  rental:Rental
  totalDay:number
  totalPrice:number=0
  car:Car
  creditCards:CreditCart[]

  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  diff: number = 0;

  selectedCardType:String="";
  cardTypes:any=["PayPal","Debit Card","Credit Card"];


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getByCarId(params["carId"])
      }
    })
    this.createCreditCardAddForm();
  }

  radioChangeHandler(event:any){
    this.selectedCardType= event.target.value;
  }

  createCreditCardAddForm(){
    this.creditCardAddForm=this.formBuilder.group({ 
      fullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', Validators.required],
      cardType: ['', Validators.required],
     });
 }
  
  checkOut(){
    if(this.creditCardAddForm.valid){
      this.checkBalanceAndFinish();
    }
    else{
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }

  checkBalanceAndFinish(){
    let creditCartModel=Object.assign({
      customerId:2002,
      cardType:this.selectedCardType,
      cardLimit:987654
    },
    this.creditCardAddForm.value
    );
    
    if(creditCartModel.cardLimit > this.totalPrice){
      this.creditCardService.add(creditCartModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message,"başarılı")
        this.router.navigate(["/cars"])
      })
    }
    else{
      console.log(this.totalPrice)
      this.toastrService.error("Kart limitiniz yetesiz. İşlem tamamlanamadı!!")
    }
  }



  calculateTotalPrice(){

    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    this.diff = Math.ceil(diff / (1000 * 3600 * 24));
    this.totalPrice = this.diff * this.car.dailyPrice;
  }

  getByCarId(carId: number) {
    this.carService.getByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getRentalByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe(response=>{
      this.rental=response.data;
    })
  }

  

}
