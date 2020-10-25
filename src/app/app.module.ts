import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateCourseComponent } from './create-course/create-course.component';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component'
import { FormsModule } from '@angular/forms';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { AddCourseDateComponent } from './add-course-date/add-course-date.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PositivecostDirective } from './positivecost.directive';
import { ValidateEnddateDirective } from './validate-enddate.directive';
import { ErrorStateComponent } from './error-state/error-state.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCourseComponent,
    HomeComponent,
    ImageZoomComponent,
    AddCourseDateComponent,
    PositivecostDirective,
    ValidateEnddateDirective,
    ErrorStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
