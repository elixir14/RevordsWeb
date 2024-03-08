import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastService } from '../../../services/ToastService';
import { ToastrService } from 'ngx-toastr';
import { BillingService } from '../../../services/billingService';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppSettings } from 'src/app/services/Constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { validate } from 'json-schema';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  // imports: [MatTabsModule]

  invoicesData: any = [];
  paymentData: any = [];
  paymentInfoData: any = [];
  UserID: any;
  displayedColumns: string[] = ['invoiceNo', 'date', 'duration', 'currency', 'invoice'];
  displayedColumn: string[] = ['Date And Time', 'Amount', 'Method'];
  displayedColumnPaymentInfo: string[] = ['Card Number', 'Name', 'Default', 'Action'];
  AddPaymentInfo = false;
  ProfileFormGroup: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  dashBoardFormControl = new FormGroup({
    businessID: new FormControl(),
  })
  id = 0;
  business;
  number: string = "3322112333232545121452";
  cardNumber: string = "";
  integerRegex="/^\d+$";
  businessNameTooltip: string = "You can contact Support to change your business name";

  constructor(private _billingservice: BillingService, public toastService: ToastService,
    private _Route: Router, private toaster: ToastrService, ) {
    this.ProfileFormGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[0-9]*$'),
      ])),
      expireMonth: new FormControl('', Validators.required),
      expireYear: new FormControl('', Validators.required),
      // cvv: new FormControl('',Validators.required),
      cvv: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ])),
      zipCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ])),
      isDefault: new FormControl(false),
    })
    this.id = 0;
    this.dropdownSettings = {
      idField: 'id',
      textField: 'businessName',
      singleSelection: true
    }
    this.business = JSON.parse(localStorage.getItem('Business'));

  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Card Holder Name is required.' },
      // { type: 'pattern', message: 'Only numbers allowed.' },
    ],
    'cardNumber': [
      { type: 'required', message: 'Card Number is required.' },
      // { type: 'pattern', message: 'Only numbers allowed.' },
    ],
    'cvv': [
      { type: 'required', message: 'CVV Number is required.' },
      { type: 'pattern', message: 'Only numbers allowed.' },
    ],
    'zipCode': [
      { type: 'required', message: 'zip Code is required.' },
      { type: 'pattern', message: 'Only numbers allowed.' },
    ],
  }

  ngOnInit() {
    this.dashBoardFormControl.controls['businessID'].setValue(this.business);
    this.common();
    // this.numberMasking(this.number);
  }
  common() {
    let businessInput = this.dashBoardFormControl.controls['businessID'].value;
    this.UserID = JSON.parse(localStorage.getItem('UserID'));
    this.GetPaymentInfoByLocationId(businessInput[0].id);
    this.GetClientInvoicesByBusinessLocationId(businessInput[0].id);
    this.GetClientPaymentsByBusinessLocationId(businessInput[0].id);
  }
  Edit(id) {
    this._billingservice.GetPaymentInfoById(id).pipe()
      .subscribe({
        next: (data) => {
          this.id = data.id;

          let mask = "";
          for (let i = 0; i <= data.cardNumber.length - 5; i++) {
            mask += "x";
          }
          data.cardNumber = mask + data.cardNumber.slice(8, 12)

          this.ProfileFormGroup.setValue({
            id: data.id,
            name: data.name,
            cardNumber: data.cardNumber,
            expireMonth: data.expireMonth,
            expireYear: data.expireYear,
            cvv: data.cvv,
            zipCode: data.zipCode,
            isDefault: data.isDefault
          });
          this.AddPaymentInfo = true;
        },
        error: error => {
        }
      })
  }
  Save() {
    if (this.ProfileFormGroup.invalid) {
      return;
    }
    let details = {
      "uniqueId": AppSettings.NewGUID(),
      "id": this.id,
      "cardNumber": this.ProfileFormGroup.controls['cardNumber'].value,
      "name": this.ProfileFormGroup.controls['name'].value,
      "cvv": this.ProfileFormGroup.controls['cvv'].value,
      "expireMonth": this.ProfileFormGroup.controls['expireMonth'].value,
      "expireYear": this.ProfileFormGroup.controls['expireYear'].value,
      "zipCode": this.ProfileFormGroup.controls['zipCode'].value,
      "isDefault": this.ProfileFormGroup.controls['isDefault'].value,
      "isActive": true,
      "createdBy": AppSettings.GetCreatedBy(),
      "createdDate": AppSettings.GetDate(),
      "lastModifiedBy": AppSettings.GetLastModifiedBy(),
      "lastModifiedDate": AppSettings.GetDate(),
      "businessGroupId": 1,
      "businessLocationId": 1
    }
    if (this.id == 0) {
      this._billingservice.PostPaymentInfo(details)
        .subscribe({
          next: (data) => {
            this.ProfileFormGroup.reset();
            let businessInput = this.dashBoardFormControl.controls['businessID'].value;
            this.GetPaymentInfoByLocationId(businessInput[0].id);
            this.AddPaymentInfo = false;
            this.id = 0;
          },
          error: error => {

          }
        });
    } else {
      this._billingservice.PutPaymentInfo(this.id, details)
        .subscribe({
          next: (data) => {
            this.ProfileFormGroup.reset();
            let businessInput = this.dashBoardFormControl.controls['businessID'].value;
            this.GetPaymentInfoByLocationId(businessInput[0].id);
            this.AddPaymentInfo = false;
            this.id = 0;
          },
          error: error => {

          }
        });
    }
  }
  Cancle() {
    this.id = 0;
    this.AddPaymentInfo = false;
  }
  GetClientInvoicesByBusinessLocationId(locationId) {
    this._billingservice.GetClientInvoicesByBusinessLocationId(locationId).pipe()
      .subscribe({
        next: (data) => {
          this.invoicesData = data;
        },
        error: error => {
        }
      })
  }
  GetClientPaymentsByBusinessLocationId(locationId) {
    this._billingservice.GetClientPaymentsByBusinessLocationId(locationId).pipe()
      .subscribe({
        next: (data) => {
          this.paymentData = data;
        },
        error: error => {
        }
      })
  }
  GetPaymentInfoByLocationId(locationId) {
    this._billingservice.GetPaymentInfoByLocationId(locationId).pipe()
      .subscribe({
        next: (data) => {
          this.paymentInfoData = data;
          this.numberMasking(this.paymentInfoData);
        },
        error: error => {
        }
      })
  }

  numberMasking(data: any) {
    data.forEach(element => {
      let mask = "";
      for (let i = 0; i <= element.cardNumber.length - 5; i++) {
        mask += "x";
      }
      element.cardNumber = mask + element.cardNumber.slice(8, 12)
    });

    // let mask = "";
    // if (_number) {
    //   for (let i = 1; i <= _number.length - 2; i++) {
    //     mask += "x";
    //   }
    //   this.cardNumber = mask + _number.slice(18, 22);
    //   return mask + _number.slice(18, 22);
    // } else {
    //   return null;
    // }
  }

  // cardMaskFunction(rawValue: string): Array<RegExp> {
  //   const card = getValidationConfigFromCardNo(rawValue);
  //   if (card) {
  //     return card.mask;
  //   }
  //   return [/\d/];
  // }

  // getCardNumberControl(): AbstractControl | null {
  //   return this.paymentForm && this.paymentForm.get("cardnumber");
  // }
}
