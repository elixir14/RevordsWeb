import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from 'src/app/services/PromotionService';

@Component({
  selector: 'app-claim-revords',
  templateUrl: './claim-revords.component.html',
  styleUrls: ['./claim-revords.component.scss']
})
export class ClaimRevordsComponent {
  type: any;
  UID: any;
  businessGroupName: any;
  rewardName: any;
  validityText: any;

  constructor(private activatedRoute: ActivatedRoute, private _promotionService: PromotionService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.type) {
        this.type = params.type;
      }
      if (params && params.UID) {
        this.UID = params.UID;
      }
    });
    this.getData();
  }

  getData() {
    this._promotionService.GetRewardsByActivityTypeAndUID(this.type, this.UID).pipe()
      .subscribe({
        next: (data) => {
          if (data != null && data != undefined && data != "" && data.length > 0) {
            this.businessGroupName = data[0].businessGroupName;
            this.rewardName = data[0].rewardName;
            this.validityText = data[0].validityText
          }
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
