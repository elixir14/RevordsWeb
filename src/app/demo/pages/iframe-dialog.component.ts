import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Output,
  } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  
  @Component({
    selector: 'app-iframe-dialog',
    templateUrl: './iframe-dialog.component.html',
  })
  export class IframeDialogComponent implements OnInit {
    url: string = '';
    urlMap: SafeResourceUrl | undefined;
    tabIndex: number = 0;
    constructor(
      private _mdr: MatDialogRef<IframeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      public sanitizer: DomSanitizer,
      private cdr: ChangeDetectorRef
    ) {
      this.url = data;
    }
  
    ngOnInit() {
        // this.url = "http://ho.hitechprojects.co.in:8101/wwwroot/Templates/38e2e370-1b05-4901-81d3-36860fbf3828.html";
        this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }
  