import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatRadioModule} from '@angular/material/radio';
import { AnnouncementService } from '../../../services/AnnouncementService';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { AnnouncementComponent } from './announcement.component';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule,FormsModule, 
    MatPaginatorModule,MatTableModule,
    MatSlideToggleModule,MatTabsModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    AngularEditorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,UtcToLocalTimePipeModule
  ],
  providers: [
    AnnouncementService,
    {
      
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
      
    },
  ],
})
export class AnnouncementModule { }
