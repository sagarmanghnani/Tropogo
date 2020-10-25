import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[appPositivecost][ngModel]',
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:PositivecostDirective,
      multi:true
    }
  ]
})
export class PositivecostDirective implements Validator{
  constructor() { }
  validate(control:AbstractControl): {[key:string]:any} | null {
    let number = control.value;
    if(number < 0){
      return {
        isPositive:false
      }
    }
    return null;
  }
}
