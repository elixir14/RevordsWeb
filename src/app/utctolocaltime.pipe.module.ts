import { NgModule } from '@angular/core';
import { UtcToLocalTimePipe } from '../app/utctolocaltime';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    UtcToLocalTimePipe
  ],
  exports: [
    UtcToLocalTimePipe
  ]
})
export class UtcToLocalTimePipeModule {}