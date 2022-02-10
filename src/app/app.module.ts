import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { ColorPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { RentalAddComponent } from './components/rental-add/rental-add.component';



@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarImageComponent,
    ColorPipePipe,
    CarFilterPipePipe,
    BrandFilterPipePipe,
    CarDetailComponent,
    PaymentComponent,
    RentalAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
