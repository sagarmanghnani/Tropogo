import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDateComponent } from './add-course-date.component';

describe('AddCourseDateComponent', () => {
  let component: AddCourseDateComponent;
  let fixture: ComponentFixture<AddCourseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
