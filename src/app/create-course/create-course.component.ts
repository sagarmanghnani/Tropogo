import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Course} from  '../../Modals/Course.modal'
import {BatchModified} from  '../../Modals/BatchModified.modal'

import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from '../image-zoom/image-zoom.component';
import { DomSanitizer } from '@angular/platform-browser';
import {Aircraft} from '../../Modals/airtcraft.enum';
import {UtilService} from 'src/util.service'
import { CourseService } from '../course.service';

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
  @ViewChild('imageupload') imageUpload:ElementRef
  constructor(
    public dialog: MatDialog,
    public domSanitizer:DomSanitizer,
    public courseService:CourseService
  ) { 
    Aircraft.MultiRotar
  }

  ngOnInit(): void {
      this.initializeBatch();
      this.courseService.deleteBatchEvent.subscribe((batchId) => {
        this.deleteBatch(batchId);
      })
  }

  initializeBatch(){
    let batch = this.addBatch();
  }

  uploadImageFile(event){
     return new Promise((resolve, reject) => {
      let image = event.target.files[0];
      let imageUrl =  this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)) ;
      resolve(imageUrl)
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
    let zoomModal = this.dialog.open(ImageZoomComponent, {
      width: '250px',
      data: {
        img_url:imgUrl
      }
    })
  }

  deleteBatch(batchId:number){
    this.batchMap.delete(batchId);
  }

  


  

}
