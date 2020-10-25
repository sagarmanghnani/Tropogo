import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit {
  imageSrc;
  constructor(
    public dialogRef: MatDialogRef<ImageZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public domSanitizer:DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.imageSrc = this.data.img_url.changingThisBreaksApplicationSecurity;
    this.imageSrc =  this.domSanitizer.bypassSecurityTrustUrl(this.imageSrc)
    
  }

}
