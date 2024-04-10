import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingComponent } from './billing.component';
import { MatTableModule } from '@angular/material/table';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule.forRoot('pk_test_51OtUU9ANXWzVIo6gmFhQjk1ZoUafmmnbUdZb2vJZosTBBwK8JWbsB3kEMPSAzIEAjpGxpb6YUiC1AtyfpPpxesBe00ASEDLBCy'),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BillingModule { }
