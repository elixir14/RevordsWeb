// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// Bootstrap Import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent {
  // private props
  

  // Constructor
  constructor() {
   
  }

  // Life cycle events
  ngOnInit(): void {
   
  }

  // public Method
  onNavChange(changeEvent: NgbNavChangeEvent) {
    
  }

  
}
