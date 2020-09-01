import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class DatePipe implements PipeTransform {
 
  transform(value: any): any {
    const today = new Date(value)
    console.log(value)
    return  today.toLocaleString('default', { month: 'short' }) +" "+ today.getDate()+", "+today.getFullYear();
  }

}
