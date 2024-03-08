import { Component, ViewChild } from '@angular/core';
import * as moment from "moment";
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { formatDate } from '@angular/common';
import { PromotionService } from '../../../services/PromotionService';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import * as dayjs from 'dayjs';

export class OtherLocationEngagements {
  LocationName: string;
  Redemptions: number;
}

export class AnalyticsDetails {
  businessLocationID: number;
  businessName: string;
  claims: number;
  emailCount: number;
  notificationCount: number;
  optOuts: number;
  promotionID: number;
  redemptions: number;
  smsMmsCount: number;
  totalClaimRate: number;
  totaloptoutRate: number;
  totalredeemRate: number;
  otherLocationEngagements: OtherLocationEngagements[] = [];
}

export class AnalyticsHeader {
  id: number;
  offerEndDate: Date;
  offerStartDate: Date;
  promotionalMessage: string;
  sentDate: Date;
  totalDelivered: number;
  totalEngagements: number;
  totalOtherEngagements: number;
  totalVisitsRate: number;
  analyticsDetails: AnalyticsDetails[] = [];
}


@Component({
  selector: 'app-campaignreach',
  templateUrl: './campaignreach.component.html',
  styleUrls: ['./campaignreach.component.scss']
})
export class CampaignreachComponent {
  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  displayData: any = [];
  OtherEngagements: any = [];
  distinctData: any = [];
  businessID: any;
  businessGroupID: any;
  isLoading: any = false;
  bussinessData: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSingle: IDropdownSettings = {};
  allSelected = false;
  selected: any;
  label: any;
  rangevalue: any;
  totalSent: any = 0;
  totalDelivered: any = 0;
  totalVisit: any = 0;
  totalVisitRate: any = 0;
  panelOpenState = false;
  selectedRange: any;
  startDate: any = formatDate((moment().subtract(6, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
  endDate: any = formatDate((moment())['_d'], 'yyyy-MM-dd', 'en-US');;
  dashBoardFormControl = this._formBuilder.group({
    businessID: ['']
  })
  @ViewChild('select') select: MatSelect;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    '3 Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'days')],
    '1 Year': [moment().subtract(12, 'month').startOf('month'), moment().subtract(1, 'days')]
  };
  location: string = "";
  dropdown: string[] = [];
  constructor(private _promotionService: PromotionService, private _formBuilder: FormBuilder) {
    this.businessGroupID = JSON.parse(localStorage.getItem('BusinessGroup'));
    this.selected = {
      startDate: dayjs().subtract(6, 'days'),
      endDate: dayjs()
    };
    this.label = "Last 7 Days";
    this.selectedRange = "Last 7 Days";
    this.startDate = formatDate((moment().subtract(6, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
    this.endDate = formatDate((moment())['_d'], 'yyyy-MM-dd', 'en-US');
  }

  datesUpdated(e) {
    this.selectedRange = this.selectedRange == "" ? "Custom range" : this.selectedRange;
    let start: string = formatDate(dayjs(new Date(e.startDate.$y, e.startDate.$M, e.startDate.$D)).toString(), 'yyyy-MM-dd', 'en-US');
    let end: string = formatDate(dayjs(new Date(e.endDate.$y, e.endDate.$M, e.endDate.$D)).toString(), 'yyyy-MM-dd', 'en-US');
    this.selected = {
      startDate: start,
      endDate: end
    };
    this.GetPromotionHistory(start, end);
  }

  getBussiness() {
    this.businessGroupID = JSON.parse(localStorage.getItem('BusinessGroup'));
    this.bussinessData = JSON.parse(localStorage.getItem('Business'));
    this.bussinessData.forEach(element => {
      this.location += element.id + ',';
    });

    this.startDate = formatDate((moment().subtract(6, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
    this.endDate = formatDate((moment())['_d'], 'yyyy-MM-dd', 'en-US');
    this.GetPromotionHistory(this.startDate, this.endDate);
  }

  open() {
    this.picker.open();
    this.selectedRange = "";
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  rangeClicked(e) {
    this.selectedRange = e.label;
  }

  ngOnInit() {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'businessName',
    };
    this.dropdownSettingsSingle = {
      idField: 'id',
      textField: 'name',
      singleSelection: true
    }
    this.getBussiness();
    let bussinessData = JSON.parse(localStorage.getItem('selectedBusiness'));
  }

  GetPromotionHistory(start: string, end: string) {
    this.isLoading = true;
    this._promotionService.GetPromotionHistoryByBusinessGroupId(this.businessGroupID.id, start, end, this.location).pipe()
      .subscribe({
        next: async (data) => {
          this.totalDelivered = 0;
          this.totalVisitRate = 0;
          this.totalVisit = 0;

          this.displayData = data['table2'];
          this.OtherEngagements = data['table3'];

          let header: AnalyticsHeader[] = [];
          let details: AnalyticsDetails[] = [];
          let other: OtherLocationEngagements[] = [];
          let dt: any = [];

          data['table1'].forEach(h => {
            details = [];
            data['table2'].forEach(d => {
              dt = [];
              other = [];
              if (d.promotionID == h.id) {
                dt = this.OtherEngagements.filter(x => x.promotionID == d.promotionID &&
                  x.sentBusinessID == d.businessLocationID);
                dt.forEach(o => {
                  other.push({
                    LocationName: o.otherEngagementBusinessName == null ? '' : o.otherEngagementBusinessName,
                    Redemptions: o.totalOtherRedemptions
                  })
                });
                details.push({
                  businessLocationID: d.businessLocationID,
                  businessName: d.businessName,
                  claims: d.claims,
                  emailCount: d.emailCount,
                  notificationCount: d.notificationCount,
                  optOuts: d.optOuts,
                  promotionID: d.promotionID,
                  redemptions: d.redemptions,
                  smsMmsCount: d.smsMmsCount,
                  totalClaimRate: d.totalClaimRate,
                  totaloptoutRate: d.totaloptoutRate,
                  totalredeemRate: d.totalredeemRate,
                  otherLocationEngagements: other
                })
              }
            });
            header.push({
              id: h.id,
              offerEndDate: h.offerEndDate,
              offerStartDate: h.OfferStartDate,
              promotionalMessage: h.promotionalMessage,
              sentDate: h.sentDate,
              totalDelivered: h.totalDelivered,
              totalEngagements: h.totalEngagements,
              totalOtherEngagements: h.totalOtherEngagements,
              totalVisitsRate: h.totalVisitsRate,
              analyticsDetails: details
            })
            this.totalDelivered += h.totalDelivered;
            this.totalVisit += h.totalEngagements + h.totalOtherEngagements;
            this.totalVisitRate = this.totalDelivered > 0 ? (this.totalVisit * 100) / this.totalDelivered : 0;
          });
          this.distinctData = header;
          this.isLoading = false;
        },
        error: error => {
          console.log(error);
          this.isLoading = false;
        }
      });
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  onBusinessLocationChanged() {
    let val: any = this.dashBoardFormControl.controls['businessID'].value;
    this.location = "";
    if (val.length > 0) {
      val.forEach(element => {
        this.location += element.id + ',';
      });
    }
    else {
      this.bussinessData.forEach(element => {
        this.location += element.id + ',';
      });
    }
    this.GetPromotionHistory(this.startDate, this.endDate);
  }
}