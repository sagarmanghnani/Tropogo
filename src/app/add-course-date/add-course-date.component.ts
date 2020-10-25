import { Component, OnInit, Input, SimpleChanges, EventEmitter, ViewChild } from '@angular/core';
import { Course } from 'src/Modals/Course.modal';
import {CourseService} from '../course.service'
import {Batch} from 'src/Modals/Batch.modal';
import { BatchModified } from 'src/Modals/BatchModified.modal';
import {LanguageModel} from 'src/Modals/Language.modal'
import { UtilService } from 'src/util.service';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-add-course-date',
  templateUrl: './add-course-date.component.html',
  styleUrls: ['./add-course-date.component.scss']
})
export class AddCourseDateComponent implements OnInit {
  @Input() batch:BatchModified;
  maxDate:Date = new Date();
  minDate:Date = new Date();
  startDate;
  endDate;
  autoCompleteSuggestions:any;
  isLocationAutoSuggestionActive:boolean = false;
  languages:LanguageModel[] = []; 
  searchedLanguages:LanguageModel[] = [];
  selectedLanguageSet:Set<number> = new Set();
  @ViewChild('form1', {static:false})form1;
  @ViewChild('form2', {static:false})form2;
  deleteBatch:EventEmitter<number> = new EventEmitter();
  constructor(
    public courseService:CourseService
  ) { }

  ngOnInit(): void {
    let date = new Date();
    this.maxDate = new Date(date.getFullYear(), 11, 31);
    this.minDate = new Date();
    this.batch.batch.location = null;
    this.getLanguage();
    this.courseService.validateBatches.subscribe(() => {
      this.validateBatch(this.form1, this.form2);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['batch'] && changes['batch'].currentValue){
      this.batch = changes['batch'].currentValue;
    }
  }

  showDate(dateTime:string){
    if(dateTime){
      return UtilService.toDDMMMFormatInDefinedFormat(dateTime);
    }else{
      return `DD MMM`
    }
  }

  assignDate(dateType:string){

    if(dateType === 'start'){
      let date = new Date(this.startDate);
      this.batch.batch.start_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }else{
      let date = new Date(this.endDate);
      this.batch.batch.end_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
  }

  async searchPlaces(event){
    let val = event.target.value;
    if(val){
      this.autoCompleteSuggestions = await this.courseService.searchPlaces(val);
      console.log(this.autoCompleteSuggestions);
    }
  }



  allotPlace(autoCompleteData:any){
    this.batch.batch.location = autoCompleteData.description;
    this.hideLocationAutoSuggestion();
  }

  hideLocationAutoSuggestion(){
    this.isLocationAutoSuggestionActive = false;
  }

  showLocationAutoSuggestion(){
    this.isLocationAutoSuggestionActive = true;
  }

  getLanguage(){
    this.courseService.getLanguages().subscribe(res => {
      this.languages = res.languages;
      this.searchedLanguages = [...this.languages];
    })
  }

  searchLanguage(event){
    let value = event.target.value;
    if(value){
      this.searchedLanguages = this.languages.filter(language => {
        if(language.language.includes(value))
        return language;
      })
    }else{
      this.searchedLanguages = [...this.languages];
    }
  }


  resetData(){
    this.batch.batch = new Batch();
    this.batch.batch.location = ''
  }

  deleteData(){
    this.courseService.deleteBatch(this.batch.batchId);
  }

  toggleExpansion(){
    this.batch.isActive = !this.batch.isActive;
    if(!this.batch.isActive){
      this.courseService.toggleBatchExpansion(null);
    }else{
      this.courseService.toggleBatchExpansion(this.batch.batchId);
    }
  }

  validateBatch(...forms){
    for(let i = 0; i< forms.length;i++){
      if(!forms[i].form.valid){
        this.batch.batch_valid = false;
        this.courseService.invalidBatches.emit(this.batch.batchId);
        return false;
      }
    }
    this.batch.batch_valid = true;
    return true;
    
  }

  disableSelectLanguage(language_id:number){
    if(this.batch.batch.language_ids && this.batch.batch.language_ids.length >= 2){
      if(this.batch.batch.language_ids.indexOf(language_id) != -1){
        return false;
      }else{
        return true;
      }
    }
    return false;
  }

  


  

}
