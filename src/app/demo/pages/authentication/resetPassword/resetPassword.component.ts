import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/LoginService';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/services/ToastService';
import { ToastsContainer } from '../../toastcontainer.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileSettingService } from 'src/app/services/ProfileSettingService';
import { AdminComponent } from 'src/app/theme/layout/admin/admin.component';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-resetPassword',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatSnackBarModule, ToastsContainer, NgbTooltipModule,
    ReactiveFormsModule],
  providers: [ToastService],
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss']
})
export default class ResetPasswordComponent {
  button = 'Save Changes';
  isLoading = false;
  UserName: string;
  NewPassword: string;
  CnfNewPassword: string;
  loading = false;
  showpwd = true;
  showcnfpwd = true;
  isvalid: boolean = true;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  PasswordClass = 'form-control';
  bussinessData: any;
  userID: any = 0;
  form: FormGroup = new FormGroup({
    newpassword: new FormControl(''),
    cnfnewpassword: new FormControl('')
  });
  submitted = false;
  constructor(private _loginservice: LoginService, public toastService: ToastService, private route: ActivatedRoute,
    private _Route: Router, private _snackBar: MatSnackBar,
    private _userservice: UserService, private formBuilder: FormBuilder,
    private _profileService: ProfileSettingService) {
    this.route.queryParams.subscribe(params => {
      this.userID = params['UID'];
    });

    this.form = this.formBuilder.group(
      {
        newpassword: [
          '',
          [
            Validators.required,
            Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/'),
          ]
        ],
        cnfnewpassword: [
          '',
          [
            Validators.required,
            Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/'),
          ]
        ]
      }
    );
  }

  chackpattern(pw: string) {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(pw)) {
      this.isvalid = true;
      this.PasswordClass = 'form-control is-valid';
    }
    else {
      this.isvalid = false;
      this.PasswordClass = 'form-control is-invalid';
    }
  }

  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (pw == cpw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  showSnackbarAction(message: string, action: string) {
    if (action == "1") {
      this.toastService.showSuccess(message);
    } else if (action == "2") {
      this.toastService.showDanger(message);
    } else if (action == "3") {
      this.toastService.show(message);
    }
  }
  onclicktoggle(str: any) {
    if (str == 'showpwd') {
      this.showpwd = !this.showpwd;
    } else {
      this.showcnfpwd = !this.showcnfpwd;
    }
  }
  async SetBusinessGroup(userId) {
    this._profileService.GetBusinessGroupesByUserID(userId)
      .subscribe({
        next: async (data) => {
          this.bussinessData = data;
          localStorage.setItem('BusinessGroup', JSON.stringify(this.bussinessData[0]));
        },
        error: error => {

        }
      });
  }

  async DoLogin() {
    this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // }

    if (this.isvalid) {
      this.isLoading = true;
      this.button = 'Processing';
      this.NewPassword = this.form.controls['newpassword'].value;
      this.CnfNewPassword = this.form.controls['cnfnewpassword'].value;

      if (this.NewPassword == this.CnfNewPassword) {
        this.passwordsMatching = true;
        this.confirmPasswordClass = 'form-control is-valid';
        this._userservice.PutUserPassword(this.userID, this.NewPassword).pipe()
          .subscribe({
            next: async (data) => {
              this.showSnackbarAction("Password Changed Successfully", "1");
              this.isLoading = false;
              this.submitted = false;
              this.button = 'Save Changes';
              this._Route.navigate(['login']);
            },
            error: error => {
              this.showSnackbarAction("Try Again", "3");
              this.isLoading = false;
              this.button = 'Save Changes';
            }
          });
      } else {
        this.passwordsMatching = false;
        this.confirmPasswordClass = 'form-control is-invalid';
        this.isLoading = false;
        this.submitted = false;
        this.button = 'Save Changes';
      }
    }
    else {
      this.submitted = false;
      this.isLoading = false;
      this.isvalid = false;
      this.PasswordClass = 'form-control is-invalid';
    }
  }
}
