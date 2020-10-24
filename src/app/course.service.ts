import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _batchCount:number = 1;
  constructor(

  ) { 
    
  }
  get batchNumber(){
    return this._batchCount
  }

  incrementBatchCount(){
    this._batchCount++;
  }
}


