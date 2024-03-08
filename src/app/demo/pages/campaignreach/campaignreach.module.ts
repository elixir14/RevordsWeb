import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignreachRoutingModule } from './campaignreach-routing.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PromotionFilterpipeModule } from '../../../PromotionFilter.pipe.module';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CampaignreachRoutingModule,
    NgxDaterangepickerMd,
    ReactiveFormsModule,
    FormsModule,
    PromotionFilterpipeModule,
    UtcToLocalTimePipeModule
  ]
})
export class CampaignreachModule { }
