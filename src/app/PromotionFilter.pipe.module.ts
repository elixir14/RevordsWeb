import { NgModule } from '@angular/core';
import { PromotionFilterpipe } from '../app/PromotionFilter.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    PromotionFilterpipe
  ],
  exports: [
    PromotionFilterpipe
  ]
})
export class PromotionFilterpipeModule {}