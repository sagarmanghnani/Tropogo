import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {LanguageModelResponse} from 'src/Modals/Language.modal'
import { Subject } from 'rxjs';

declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _batchCount:number = 1;
  googleAutoComplete:any;
  GET_LANGUAGE:string = `assets/language.json`;
  deleteBatchEvent:EventEmitter<number> = new EventEmitter();
  toggleBatchExpansionEvent:EventEmitter<number | null> = new EventEmitter();
  validateBatches:Subject<any> = new Subject();
  invalidBatches:EventEmitter<any> = new EventEmitter();
  constructor(
    public http:HttpClient
  ) { 
    this.googleAutoComplete = new google.maps.places.AutocompleteService();
  }
  get batchNumber(){
    return this._batchCount
  }

  incrementBatchCount(){
    this._batchCount++;
  }

  searchPlaces(input:string){
    return new Promise((resolve, reject) => {
      let autoCompleteArr = [];
      this.googleAutoComplete.getPlacePredictions({
      input:input,
      componentRestrictions:{country: "IN"},
      types: ['(cities)'],
      }, (predictions, status) => {
        if(predictions){
          predictions.forEach((prediction) => {
            autoCompleteArr.push(prediction);
          });
        }
        resolve(autoCompleteArr);
      })
    })
  }

  getLanguages():Observable<LanguageModelResponse>{
    return this.http.get<LanguageModelResponse>(this.GET_LANGUAGE);
  }

   deleteBatch(batch_id:number){
    this.deleteBatchEvent.emit(batch_id);
  }

  toggleBatchExpansion(batch_id:number | null){
    this.toggleBatchExpansionEvent.emit(batch_id);
  }


  
  

  

  


}


