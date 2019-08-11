import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {CartComponent} from '../cart/cart.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }


  openBottomSheet(): void {
    this.bottomSheet.open(CartComponent);
  }

}
