import { Directive, Attribute, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import * as moment from 'moment'
@Directive({
  selector: '[appValidateEnddate][formControlName], [startdate][formControl], [startdate][ngModel]',
  providers: [
    {
      provide:NG_VALIDATORS,
      useExisting:ValidateEnddateDirective,
      multi:true
    }
  ]
})
export class ValidateEnddateDirective implements Validator {
  @Input('startdate') startdate:any;
  constructor(
    
  ) {
    
   }
   validate(control:AbstractControl): {[key:string]:any} | null {
     let endDate = moment(control.value);
     let startDate = moment(this.startdate);

     let diff = endDate.diff(startDate, 'days');
     if(diff < 0){
       return {
         isDateValid:false
       }
     }
     return null;
   }

}
