import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitydashboardRoutingModule } from './activitydashboard-routing.module';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivitydashboardComponent } from './activitydashboard.component';
import { PhonePipeModule } from 'src/app/phone.pipe.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    ActivitydashboardRoutingModule,
    ReactiveFormsModule,
    RouterModule, FormsModule, MatPaginatorModule, MatTableModule, NgbTooltipModule,
    PhonePipeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    AsyncPipe,
    FormsModule,
    MatCheckboxModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    MatSortModule,
    UtcToLocalTimePipeModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#ffb094",
      innerStrokeColor: "#479aef",
      animationDuration: 300,
      unitsColor: "white",
      titleColor: "white",
      subtitleColor: "white"
    }),
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
  ],
  declarations: [ActivitydashboardComponent]
})
export class ActivitydashboardModule { }
