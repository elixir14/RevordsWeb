import { NgModule } from '@angular/core';
import { PhonePipe } from '../app/phone.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    PhonePipe
  ],
  exports: [
    PhonePipe
  ]
})
export class PhonePipeModule {}