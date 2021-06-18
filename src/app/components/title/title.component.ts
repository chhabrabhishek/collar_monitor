import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  logo = '../../../assets/pet-collar.png';
  tempControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  toggled(){
    this.valueChange.emit(this.tempControl.value);
  }

}
