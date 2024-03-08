import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RewardService } from 'src/app/services/RewardService';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/services/ToastService';
import { AppSettings } from 'src/app/services/Constants';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/LoginService';

export interface PeriodicElement {
  rewardname: string;
  points: number;
  hours: string;
}
const COLUMNS_SCHEMA = [
  {
    key: "rewardName",
    type: "text",
    label: "Reward"
  },
  {
    key: "points",
    type: "text",
    label: "Pt Cost"
  }
]
const USER_DATA = [
  { "rewardName": "$5 Free Play - Redeem 10 points", "points": "10" },
  { "rewardName": "$10 Free Play - Redeem 18 points", "points": "18" },
  { "rewardName": "$15 Free Play - Redeem 25 points", "points": "28" },
];
@Component({
  selector: 'app-accountInfo',
  templateUrl: './accountInfo.component.html',
  styleUrls: ['./accountInfo.component.scss']
})
export class AccountInfoComponent {
  isLoading = false;
  userData: any;
  userAccount: any;
  userPhone: any;
  showPwd = false;
  showNPwd = false;
  showCNPwd = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  currentPasswordClass = 'form-control';
  isvalid: boolean = false;
  isCurrentPwdMatch: boolean = true;
  isNewPwdEmpty: boolean = true;

  constructor(private _memberservice: RewardService, public toastService: ToastService, private _formBuilder: FormBuilder,
    private _Route: Router, private toaster: ToastrService, private _loginservice: LoginService) {
    this.userData = JSON.parse(localStorage.getItem('UserData'));
    this.userPhone = this.formatPhoneNumber(this.userData.mobile);

    this.userAccount = this._formBuilder.group({
      fname: [this.userData.firstName],
      lname: [this.userData.lastName],
      email: [this.userData.email],
      pwd: [''],
      npwd: ['', [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/'),
      ]],
      cnpwd: [''],
    });
  }

  ngOnInit() {
   
  }

  formatPhoneNumber(num) {
    var s2 = ("" + num).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  onclickPwdtoggle(val) {
    if (val == 'pwd') {
      this.showPwd = !this.showPwd;
    } else if (val == 'npwd') {
      this.showNPwd = !this.showNPwd;
    } else if (val == 'cnpwd') {
      this.showCNPwd = !this.showCNPwd
    }
  }

  checkpattern(pw: string) {
    this.isNewPwdEmpty = true;
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(pw)) {
      this.isvalid = true;
      this.isNewPwdEmpty = true;
    }
    else {
      this.isvalid = false;
    }
  }

  checkPasswords(pw: string, cpw: string) {
    if (pw != '') {
      this.isConfirmPasswordDirty = true;
      if (pw == cpw) {
        this.passwordsMatching = true;
        this.confirmPasswordClass = 'form-control is-valid';
      } else {
        this.passwordsMatching = false;
        this.confirmPasswordClass = 'form-control is-invalid';
      }
    }
  }

  save() {
    this.isLoading = true;
    if (this.userAccount.value.pwd == '' && this.userAccount.value.npwd == '' && this.userAccount.value.cnpwd == '') {
      let userDataToChange = {
        "userId": this.userData.userId,
        "password": this.userAccount.value.pwd == '' ? this.userData.password : this.userAccount.value.pwd,
        "firstName": this.userAccount.value.fname,
        "lastName": this.userAccount.value.lname,
        "email": this.userAccount.value.email,
        "lastModifiedBy": this.userData.userId,
        "lastModifiedDate": AppSettings.GetDate()
      }
      this._loginservice.PutUserAccountInfoInWeb(userDataToChange)
        .subscribe({
          next: (data) => {
            localStorage.removeItem('UserData');
            localStorage.setItem('UserData', JSON.stringify(data));
            this.userData = JSON.parse(localStorage.getItem('UserData'));

            this.isLoading = false;
            this.userAccount.get('pwd').setValue('');
            this.userAccount.get('npwd').setValue('');
            this.userAccount.get('cnpwd').setValue('');
            this.confirmPasswordClass = 'form-control';
            this.currentPasswordClass = 'form-control';
            this.toastService.showSuccess("Saved Changes Successfully");
          },
          error: error => {
            this.isLoading = false;
          }
        });
    } else {
      if (this.userAccount.value.pwd == this.userData.password) {
        this.currentPasswordClass = 'form-control is-valid';
        this.isCurrentPwdMatch = true;
        if (this.userAccount.value.npwd == this.userAccount.value.cnpwd && this.userAccount.value.npwd != '' && this.isvalid == true) {
          this.isNewPwdEmpty = true;

          let userDataToChange = {
            "userId": this.userData.userId,
            "password": this.userAccount.value.npwd,
            "firstName": this.userAccount.value.fname,
            "lastName": this.userAccount.value.lname,
            "email": this.userAccount.value.email,
            "lastModifiedBy": this.userData.userId,
            "lastModifiedDate": AppSettings.GetDate()
          }
          this._loginservice.PutUserAccountInfoInWeb(userDataToChange)
            .subscribe({
              next: (data) => {
                localStorage.removeItem('UserData');
                localStorage.setItem('UserData', JSON.stringify(data));
                this.userData = JSON.parse(localStorage.getItem('UserData'));

                this.isLoading = false;
                this.userAccount.get('pwd').setValue('');
                this.userAccount.get('npwd').setValue('');
                this.userAccount.get('cnpwd').setValue('');
                this.confirmPasswordClass = 'form-control';
                this.currentPasswordClass = 'form-control';
                this.toastService.showSuccess("Saved Changes Successfully");
              },
              error: error => {
                this.isLoading = false;
              }
            });
        } else {
          if (this.userAccount.value.npwd == '' || this.isvalid == false) {
            this.isNewPwdEmpty = false;
            this.confirmPasswordClass = 'form-control is-invalid';
            this.isLoading = false;
            this.isvalid = true;
            this.toastService.showDanger("New Password is invalid");
          } else {
            this.passwordsMatching = false;
            this.isvalid = false;
            this.isLoading = false;
            this.toastService.showDanger("Password didn't match");
          }
        }
      } else {

        this.currentPasswordClass = 'form-control is-invalid';
        this.isCurrentPwdMatch = false;
        this.isLoading = false;
        this.toastService.showDanger("Current Password didn't match");
      }
    }
  }
}
