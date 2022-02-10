import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: CarDetail[],  filterCar: string): CarDetail[] {
    filterCar=filterCar?filterCar.toLocaleLowerCase():""
    return filterCar?value.filter((c:CarDetail)=>c.description.toLocaleLowerCase().indexOf(filterCar)!==-1):value;
  }

}
