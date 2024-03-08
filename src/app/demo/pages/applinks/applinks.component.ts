import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { SourceService } from '../../../services/SourceService';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/ToastService';
import { AppSettings } from '../../../services/Constants';
import { TagDefinationService } from '../../../services/TagDefinitionService';
import { CommonService } from '../../../services/CommonService';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
    id: string;
    sourceName: string;
    businessLocationName: string;
}

@Component({
    selector: 'app-app-links',
    templateUrl: './applinks.component.html',
    styleUrls: ['./applinks.component.scss']
})
export class AppLinksComponent {

    constructor(public platform: Platform) {
        if (this.platform.IOS) {
            window.location.replace("https://apps.apple.com/in/app/revord/id6474188184");
        }
        else if (this.platform.ANDROID) {
            window.location.replace('https://play.google.com/store/apps/details?id=com.revordsMobile.app&hl=en_IN&gl=US');
        }
        if (this.platform.SAFARI) {
            setTimeout(() => {
                window.location.replace('https://apps.apple.com/in/app/revord/id6474188184');
            })
        }
        else if (this.platform.isBrowser) {
            console.log('this is Browser device!');
        }
    }


    ngOnInit() {

    }


}