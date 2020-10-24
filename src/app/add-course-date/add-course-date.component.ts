import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Course } from 'src/Modals/Course.modal';
import {CourseService} from '../course.service'
import {Batch} from 'src/Modals/Batch.modal';
import { BatchModified } from 'src/Modals/BatchModified.modal';

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
  constructor(
    public courseService:CourseService
  ) { }

  ngOnInit(): void {
    let date = new Date();
    this.maxDate = new Date(date.getFullYear(), 11, 31);
    this.minDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['batch'] && changes['batch'].currentValue){
      this.batch = changes['batch'].currentValue;
    }
  }

  showDate(dateTime:string){
    if(dateTime){
      return dateTime;
    }else{
      return `DD MMM`
    }
  }

  assignDate(dateType:string){

    if(dateType === 'start'){
      let date = new Date(this.startDate);
      this.batch.batch.start_date = `${date.getDate()}-${date.getMonth() + 1}`;
    }else{
      let date = new Date(this.endDate);
      this.batch.batch.end_date = `${date.getDate()}-${date.getMonth() + 1}`;
    }
  }

  

  resetData(){}

  deleteData(){}


  

}
