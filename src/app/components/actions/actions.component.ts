import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnChanges {

  @Input() animal: any;
  @Input() dangerCategories: any;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  informAuthorities() {
    this._snackBar.open("The designated authorities will be informed about the probable danger",'OK', {
      duration: 3000
    });
  }

  isDeer(animal: any){
    if(animal.name == 'Deer'){
      return true;
    }else{
      return false;
    }
  }

  isElephant(animal: any) {
    if(animal.name == 'Elephant'){
      return true;
    }else{
      return false;
    }
  }

}
