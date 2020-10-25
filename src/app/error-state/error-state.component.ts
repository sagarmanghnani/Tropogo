import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss']
})
export class ErrorStateComponent implements OnInit {
  @Input() msg:string;
  @Output() closeErroAlert:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['msg'].currentValue){
      this.msg = changes['msg'].currentValue;
    }
  }

  closeErrorState(){
    this.closeErroAlert.emit();
  }

}
