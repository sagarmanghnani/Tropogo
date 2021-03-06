import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Course} from  '../../Modals/Course.modal'
import {BatchModified} from  '../../Modals/BatchModified.modal'

import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from '../image-zoom/image-zoom.component';
import { DomSanitizer } from '@angular/platform-browser';
import {Aircraft} from '../../Modals/airtcraft.enum';
import {UtilService} from 'src/util.service'
import { CourseService } from '../course.service';
import { Batch } from 'src/Modals/Batch.modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  createCourse:Course = new Course();
  aircraftTypes = Aircraft;
  batchMap:Map<number, BatchModified> = new Map();
  activeBatchId:number = null;
  batches:BatchModified[] = [];
  invalid_batches:number[] = [];
  validationForCourse:boolean = true;
  showErrorState:boolean = false;
  errorMsg:string;
  @ViewChild('form') form;
  @ViewChild('imageupload') imageUpload:ElementRef
  constructor(
    public dialog: MatDialog,
    public domSanitizer:DomSanitizer,
    public courseService:CourseService,
    public snackbar:MatSnackBar
  ) { 
    Aircraft.MultiRotar
  }

  ngOnInit(): void {
      this.initializeBatch();
      this.courseService.deleteBatchEvent.subscribe((batchId) => {
        this.deleteBatch(batchId);
      });

      this.courseService.toggleBatchExpansionEvent.subscribe((batchId) => {
        if(batchId){
          if(this.batchMap.has(this.activeBatchId) && this.activeBatchId !== null){
            let batch = this.batchMap.get(this.activeBatchId);
            batch.isActive = false;
          }
        }
        this.activeBatchId = batchId;
      })

      this.courseService.invalidBatches.subscribe(batchId => {
        this.invalid_batches.push(batchId);
      })
      this.errorMsg = `Fill in the required information to proceed`
      
  }

  initializeBatch(){
    let batch = this.addBatch();
  }

  uploadImageFile(event){
     return new Promise((resolve, reject) => {
      let image = event.target.files[0];
      if(image){
        let imageUrl =  this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)) ;
        resolve(imageUrl)
      }
      reject();
    })
  }

  addImage(event){
    this.uploadImageFile(event).then((image_url:string) => {
      this.createCourse.image_urls.push(image_url);
   });
  }

  addBatch(): BatchModified{
    let batch = new BatchModified();
    batch.batchId = UtilService.generateRandomNumber(100000);
    batch.batch.name = `Batch ${this.courseService.batchNumber}`;
    this.courseService.incrementBatchCount();
    batch.isActive = true;
    this.closePreviousBatch();
    this.activeBatchId = batch.batchId
    this.batchMap.set(batch.batchId, batch);
    this.batches.push(batch);
    return batch
  }

  uploadImage(){
    this.imageUpload.nativeElement.click();
  }

  closePreviousBatch(){
    if(this.batchMap.has(this.activeBatchId)){
      let batch = this.batchMap.get(this.activeBatchId);
      batch.isActive = false;
    }
  }

  createZoomModal(imgUrl:string){
    let width = '250px'
    if(window.innerWidth > 750){
      width = '600px'
    }
    let zoomModal = this.dialog.open(ImageZoomComponent, {
      width: width,
      data: {
        img_url:imgUrl
      }
    })
  }

  deleteBatch(batchId:number){
    this.batchMap.delete(batchId);
    let batchIndex = this.batches.findIndex((batch) => {
      return batch.batchId === batchId
    })
    this.batches.splice(batchIndex, 1);
  }


  validateBatchesAndCourses(){
    this.invalid_batches = [];
    this.courseService.validateBatches.next();
    if(!this.invalid_batches.length){
      if(!this.form.form.valid){
        this.showErrorState = true;
        this.validationForCourse = false;
        return false;
      }else{
        this.showErrorState = false;
        this.validationForCourse = true;
        this.snackbar.open("Course generated successfully", null, {
          duration:2000
        })
        return true;
      }
    }else{
      this.showErrorState = true;
      this.validationForCourse = false;
      return false;
    }
  }

  hideErrorState(){
    this.showErrorState = false;
  }

  


  

  


  

}
