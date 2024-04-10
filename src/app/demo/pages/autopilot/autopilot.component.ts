import { Component, ViewChild } from '@angular/core';
import { Router } from 'express';
import { ToastService } from '../../../services/ToastService';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CommonService } from '../../../services/CommonService';
import { formatDate } from '@angular/common';
import { PromotionService } from '../../../services/PromotionService';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import * as dayjs from 'dayjs';
import { AutopilotConfigService } from 'src/app/services/AutopilotConfigService';

@Component({
  selector: 'app-autopilot',
  templateUrl: './autopilot.component.html',
  styleUrls: ['./autopilot.component.scss']
})
export class AutopilotComponent {
  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  displayData: any;
  displayDataActive: any;
  displayDataInactive: any;
  distinctData: any;
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
  startDate: any = formatDate((moment().subtract(30, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
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

  constructor(private _promotionService: PromotionService, private _commonService: CommonService, 
    private _formBuilder: FormBuilder,private _autopilotService:AutopilotConfigService) {
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
    if (e.startDate != null) {
      this.selectedRange = this.selectedRange == "" ? "Custom range" : this.selectedRange;
      let start: string = formatDate(dayjs(new Date(e.startDate.$y, e.startDate.$M, e.startDate.$D)).toString(), 'yyyy-MM-dd', 'en-US');
      let end: string = formatDate(dayjs(new Date(e.endDate.$y, e.endDate.$M, e.endDate.$D)).toString(), 'yyyy-MM-dd', 'en-US');
      this.selected = {
        startDate: start,
        endDate: end
      };
      this.GetAutopilotHistory(start, end);
    }
  }

  getBussiness() {
    this.businessGroupID = JSON.parse(localStorage.getItem('BusinessGroup'));
    this.bussinessData = JSON.parse(localStorage.getItem('Business'));
    this.bussinessData.forEach(element => {
      this.location += element.id + ',';
    });
    let s = formatDate((moment().subtract(30, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
    let e = formatDate((moment().add(1, 'days'))['_d'], 'yyyy-MM-dd', 'en-US');
    this.GetAutopilotHistory(s, e);
  }

  open() {
    this.picker.open();
    this.label = "";
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

  GetAutopilotHistory(start: string, end: string) {
    this.isLoading = true;
    this._autopilotService.GetAutoPilotHistoryByBusinessGroupID(this.businessGroupID.id, start, end,this.location).pipe()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.displayData = data;
          this.totalDelivered = 0;
          this.totalVisitRate = 0;
          this.totalVisit = 0;

          this.distinctData = data.filter(
            (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
          );

          this.displayData.forEach(element => {
            this.totalDelivered += element.totalDelivered;
            this.totalVisit += element.totalEngagements + element.totalOtherEngagements
          });
          this.totalVisitRate = this.totalDelivered > 0 ? (this.totalVisit * 100) / this.totalDelivered : 0;

          this.distinctData.forEach((element: any) => {
            let delivered = 0;
            let engagements = 0;
            let otherEngagements = 0;
            data.forEach((x: any) => {
              if (x.id == element.id) {
                delivered += x.totalDelivered;
                engagements += x.totalEngagements;
                otherEngagements += x.totalOtherEngagements;
              }
            });
            element.totalDelivered = delivered;
            element.totalEngagements = engagements;
            element.totalOtherEngagements = otherEngagements;
          });

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
    this.GetAutopilotHistory(this.startDate, this.endDate);
  }
}
