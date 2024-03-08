import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from 'src/app/services/PromotionService';

@Component({
  selector: 'unsubscribeemail',
  templateUrl: './unsubscribeEmail.component.html',
  styleUrls: ['./unsubscribeEmail.component.scss']
})
export class UnSubscribeEmailComponent {
  type: any;
  UID: any;
  businessGroupName: any;
  memberName: any;
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
  }

  getData() {
    this._promotionService.GetUnSubScribeEmailByActivityTypeAndUID(this.type, this.UID).pipe()
      .subscribe({
        next: (data) => {
          if (data != null && data != undefined && data != "" && data.length > 0) {
            this.businessGroupName = data[0].businessGroupName;
            this.memberName = data[0].rewardName;

            document.getElementById('msg').style.display = 'none';
            document.getElementById('sorry').style.display = 'none';
            document.getElementById('btnUnsubscribe').style.display = 'none';
            document.getElementById('showResponseMsg').style.display = 'block';
          }
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
