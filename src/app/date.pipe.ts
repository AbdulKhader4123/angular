import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class DatePipe implements PipeTransform {
 
  transform(value: any): any {
    if(value=="" || value==null ){
 return "Pending"
    }
    const today = new Date(value)
    return  today.toLocaleString('default', { month: 'short' }) +" "+ today.getDate()+", "+today.getFullYear();
  }

}
