import { Component } from '@angular/core';
import { ProfileSettingService } from '../../../services/ProfileSettingService';
import { StateService } from '../../../services/StateService';
import { stat } from 'fs';
import { BusinessLabelService } from '../../../services/businessLabelService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { FileUploadService } from '../../../services/fileuploadservie';
import { HttpEventType } from '@angular/common/http';
import { AppSettings } from '../../../services/Constants';
import { ToastService } from '../../../services/ToastService';
import * as moment from "moment";

@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.scss']
})
export class ProfilesettingComponent {
  businessGroupID: any;
  businessID: any;
  countryID: number = 2;
  app: any;
  x: any;
  labelsReq: any = false;
  businessNameTooltip: string = "You can contact Support to change your business name";
  shortNameTooltip: string = "We use your business short name when sending out mobile campaigns and some places on the website. You can contact Support to change your business short name";
  hoursTooltip: string = "One day per line.";
  industryTooltip: string = "Choosing an Industry helps us cater the Revords program better to your unique business. You can contact Support to change your Industry";
  businessLabelsTooltip: string = "Accurate and specific labels help customers find your business easier.";
  websiteTooltip: string = "The full URL! This includes the http:// or https:// at the beginning for the best SEO results.";
  facebookURLTooltip: string = "The full URL! This includes the http:// or https:// at the beginning for the best SEO results.";
  googleURLTooltip: string = "The full URL! This includes the http:// or https:// at the beginning for the best SEO results.";
  yelpURLTooltip: string = "The full URL! This includes the http:// or https:// at the beginning for the best SEO results.";
  states: any = [];
  businessLabels: any = [];
  ProfileFormGroup: FormGroup;
  selectedBusiness: { id: number, name: string }[] = [];
  filteredBusiness: any = [];
  file: File = null;
  file1: File = null;
  uploadProgress: any = undefined;
  uploadProgress1: any = undefined;
  uploadSub: Subscription;
  uploadSub1: Subscription;
  loadingLoading: boolean = false;
  isfileUploaded = false;
  isfileUploaded1 = false;
  filegallery: File = null;
  galleryuploadSub: Subscription;
  galleryuploadProgress1: any = undefined;
  GalleryImageUrl1: any;
  GalleryPath1: any;
  galleryuploadProgress2: any = undefined;
  GalleryImageUrl2: any;
  GalleryPath2: any;
  galleryuploadProgress3: any = undefined;
  GalleryImageUrl3: any;
  GalleryPath3: any;
  galleryuploadProgress4: any = undefined;
  GalleryImageUrl4: any;
  GalleryPath4: any;
  submitted = false;
  isLoading = false;
  imagePath: any;
  logoPath: any;
  latitude: any;
  longitude: any;
  uniqueId: any;
  id: any;
  dataSource: any;
  labels: any;
  workingHoursID: any;
  iseditmode: any = false;
  workingHoursUniqueID: any;
  BusinessImageUrl1: any;
  BusinessImageUrl2: any;
  isAgeRestriction: Boolean = false;

  constructor(private profileSettingService: ProfileSettingService, private stateService: StateService,
    private businessLabelService: BusinessLabelService, private uploadService: FileUploadService,
    public toastService: ToastService) {
    this.businessGroupID = JSON.parse(localStorage.getItem('BusinessGroup'));
    this.ProfileFormGroup = new FormGroup({
      businessName: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      stateCodeId: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      pinCode: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      label: new FormControl(''),
      website: new FormControl(''),
      facebookUrl: new FormControl(''),
      twitterUrl: new FormControl(''),
      googleUrl: new FormControl(''),
      instagramUrl: new FormControl(''),
      yelpUrl: new FormControl(''),
      monFromTime: new FormControl(''),
      monToTime: new FormControl(''),
      tueFromTime: new FormControl(''),
      tueToTime: new FormControl(''),
      wedFromTime: new FormControl(''),
      wedToTime: new FormControl(''),
      thuFromTime: new FormControl(''),
      thuToTime: new FormControl(''),
      friFromTime: new FormControl(''),
      friToTime: new FormControl(''),
      satFromTime: new FormControl(''),
      satToTime: new FormControl(''),
      sunFromTime: new FormControl(''),
      sunToTime: new FormControl(''),
    })

    this.ProfileFormGroup.controls['businessName'].disable();
    this.ProfileFormGroup.controls['shortName'].disable();
  }
  ngOnInit() {
    this.GetStatesByCountryID();
    this.GetBusinessLabelsByBusinessID();
    this.GetBusinessProfilesByGroupID();
  }
  Cancle() {
    this.iseditmode = false;
    this.businessID = 0;
    this.isAgeRestriction = false;
  }
  GetBusinessProfilesByGroupID() {
    this.profileSettingService.GetBusinessProfilesByGroupID(this.businessGroupID.id).pipe().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    })
  }
  GetBusinessProfile(bID) {
    this.businessID = bID;
    this.profileSettingService.GetBusinessProfilesByID(bID).pipe().subscribe((data) => {      
      this.isAgeRestriction = data.isAgeRestriction;
      console.log(data);
      this.ProfileFormGroup.controls['businessName'].setValue(data["legalName"]);
      this.ProfileFormGroup.controls['shortName'].setValue(data["businessName"]);
      this.ProfileFormGroup.controls['address'].setValue(data["adress"]);
      this.ProfileFormGroup.controls['city'].setValue(data["city"]);
      this.ProfileFormGroup.controls['stateCodeId'].setValue(data['stateCodeID']);
      this.ProfileFormGroup.controls['phoneNo'].setValue(data["phoneNo"]);
      this.ProfileFormGroup.controls['pinCode'].setValue(data["pinCode"]);
      this.ProfileFormGroup.controls['industry'].setValue(data["industry"]);
      this.ProfileFormGroup.controls['description'].setValue(data["descriptions"]);
      this.ProfileFormGroup.controls['website'].setValue(data["website"]);
      this.ProfileFormGroup.controls['facebookUrl'].setValue(data["facebookUrl"]);
      this.ProfileFormGroup.controls['twitterUrl'].setValue(data["twitterUrl"]);
      this.ProfileFormGroup.controls['googleUrl'].setValue(data["googleUrl"]);
      this.ProfileFormGroup.controls['instagramUrl'].setValue(data["instagramUrl"]);
      this.ProfileFormGroup.controls['yelpUrl'].setValue(data["yelpUrl"]);
      if (data['imagePath'] != null && data['imagePath'] != "") {
        this.BusinessImageUrl2 = AppSettings.API_ENDPOINT + "/" + data['imagePath'].replace(" ", "%20");
      }
      if (data['logoPath'] != null && data['logoPath'] != "") {
        this.BusinessImageUrl1 = AppSettings.API_ENDPOINT + "/" + data['logoPath'].replace(" ", "%20");
      }
      if (data['galleryImagePath1'] != null && data['galleryImagePath1'] != "") {
        this.GalleryImageUrl1 = AppSettings.API_ENDPOINT + "/" + data['galleryImagePath1'].replace(" ", "%20");
      }
      if (data['galleryImagePath2'] != null && data['galleryImagePath2'] != "") {
        this.GalleryImageUrl2 = AppSettings.API_ENDPOINT + "/" + data['galleryImagePath2'].replace(" ", "%20");
      }
      if (data['galleryImagePath3'] != null && data['galleryImagePath3'] != "") {
        this.GalleryImageUrl3 = AppSettings.API_ENDPOINT + "/" + data['galleryImagePath3'].replace(" ", "%20");
      }
      if (data['galleryImagePath4'] != null && data['galleryImagePath4'] != "") {
        this.GalleryImageUrl4 = AppSettings.API_ENDPOINT + "/" + data['galleryImagePath4'].replace(" ", "%20");
      }
      this.logoPath = data['logoPath'];
      this.imagePath = data['imagePath'];
      this.GalleryPath1 = data['galleryImagePath1'];
      this.GalleryPath2 = data['galleryImagePath2'];
      this.GalleryPath3 = data['galleryImagePath3'];
      this.GalleryPath4 = data['galleryImagePath4'];
      this.latitude = data['latitude'];
      this.longitude = data['longitude'];
      this.uniqueId = data['uniqueId'];
      this.id = data['id'];
      this.labels = this.GetBusinessLabelsForEdit(data['businesswiseLabels']);
      this.BindBusinessWorkingDays(data['businesswiseWorkingDays']);
      this.selectedBusiness = [];
      this.labels.forEach(element => {
        this.selectedBusiness.push({
          id: element.labelID,
          name: this.businessLabels.filter(x => x.id == element.labelID)[0].name
        })
      });
      // document.getElementById("dLabel").innerText = this.states.filter(x => x.id == data['stateCodeID'])[0].name;
      console.log(data);

    })
  }
  Edit(item) {
    console.log(item);
    this.file = null;
    this.file1 = null;
    this.filegallery = null;
    this.uploadProgress = undefined;
    this.uploadProgress1 = undefined;
    this.galleryuploadProgress1 = undefined;
    this.galleryuploadProgress2 = undefined;
    this.galleryuploadProgress3 = undefined;
    this.galleryuploadProgress4 = undefined;
    this.BusinessImageUrl1 = '';
    this.BusinessImageUrl2 = '';
    this.GalleryImageUrl1 = '';
    this.GalleryImageUrl2 = '';
    this.GalleryImageUrl3 = '';
    this.GalleryImageUrl4 = '';
    this.GetBusinessProfile(item.id);
    this.iseditmode = true;
    if (this.imagePath != '') {
      this.uploadProgress1 = "100%";
    }
    if (this.logoPath != '') {
      this.uploadProgress = "100%";
    }
    if (this.GalleryPath1 != '') {
      this.galleryuploadProgress1 = "100%";
    }
    if (this.GalleryPath2 != '') {
      this.galleryuploadProgress2 = "100%";
    }
    if (this.GalleryPath3 != '') {
      this.galleryuploadProgress3 = "100%";
    }
    if (this.GalleryPath4 != '') {
      this.galleryuploadProgress4 = "100%";
    }
  }
  GetBusinessLabelsForEdit(data: any) {
    let details = [];
    data.forEach((element: any) => {
      let tempdefDetails = {
        "uniqueID": element.uniqueId,
        "id": element.id,
        "businessID": element.businessId,
        "labelID": element.labelId,
        "isActive": element.isActive,
        "createdDate": element.createdDate,
        "createdBy": element.createdBy,
        "lastModifiedBy": element.lastModifiedBy,
        "lastModifiedDate": element.lastModifiedDate,
      }
      details.push(tempdefDetails);
    });
    return details;
  }

  BindBusinessWorkingDays(data: any) {
    this.ProfileFormGroup.controls['monFromTime'].setValue(data.length > 0 ? moment(data[0].monFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['monToTime'].setValue(data.length > 0 ? moment(data[0].monToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['tueFromTime'].setValue(data.length > 0 ? moment(data[0].tueFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['tueToTime'].setValue(data.length > 0 ? moment(data[0].tueToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['wedFromTime'].setValue(data.length > 0 ? moment(data[0].wedFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['wedToTime'].setValue(data.length > 0 ? moment(data[0].wedToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['thuFromTime'].setValue(data.length > 0 ? moment(data[0].thuFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['thuToTime'].setValue(data.length > 0 ? moment(data[0].thuToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['friFromTime'].setValue(data.length > 0 ? moment(data[0].friFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['friToTime'].setValue(data.length > 0 ? moment(data[0].friToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['satFromTime'].setValue(data.length > 0 ? moment(data[0].satFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['satToTime'].setValue(data.length > 0 ? moment(data[0].satToTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['sunFromTime'].setValue(data.length > 0 ? moment(data[0].sunFromTime).format('HH:mm') : '00:00');
    this.ProfileFormGroup.controls['sunToTime'].setValue(data.length > 0 ? moment(data[0].sunToTime).format('HH:mm') : '00:00')
  }

  GetStatesByCountryID() {
    this.stateService.GetStatesByCountryID(this.countryID).pipe().subscribe((data) => {
      this.states = data;
      console.log(this.states);
    })
  }

  GetBusinessLabelsByBusinessID() {
    this.businessLabelService.GetBusinessLabelsByBusinessID().subscribe({
      next: (data) => {
        this.businessLabels = data;
        this.filteredBusiness = this.businessLabels;
      },
      error: error => {

      }
    })
  }

  selectState(state: any) {
    // document.getElementById("dLabel").innerText = state.name;
    this.ProfileFormGroup.controls['stateCodeId'].setValue(state.id)
  }

  businessLabelOnChange() {
    if (this.ProfileFormGroup.controls["label"].value.length >= 2) {
      this.filteredBusiness = this.filteredBusiness.filter(x => x.name.toLowerCase().includes(this.ProfileFormGroup.controls['label'].value.toLowerCase()));
    }
    else {
      this.filteredBusiness = this.businessLabels;
    }
  }

  selectBusiness(id: any) {
    if (this.selectedBusiness.filter(x => x.id == id).length == 0) {
      this.ProfileFormGroup.controls['label'].setValue('');
      this.selectedBusiness.push({
        id: id,
        name: this.businessLabels.filter(x => x.id == id)[0].name
      })
    }
  }

  removeBusiness(id: any) {
    this.selectedBusiness = this.selectedBusiness.filter(x => x.id != id);
  }
  onChangegallery(event) {
    this.filegallery = event.target.files[0];
  }
  onUploadgallery() {
    this.loadingLoading = true;
    // this.galleryuploadProgress1 = "100";
    if (this.filegallery) {
      this.loadingLoading = true;
      this.galleryuploadSub = this.uploadService.uploadBusinessImage(this.filegallery).subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          let ProgressValue = Math.round(100 * (event.loaded / event.total)).toString() + "%";
          if (this.galleryuploadProgress1 == null || this.galleryuploadProgress1 == "" || this.galleryuploadProgress1 == 'undefined') {
            this.galleryuploadProgress1 = ProgressValue;
          }
          else if (this.galleryuploadProgress2 == null || this.galleryuploadProgress2 == "" || this.galleryuploadProgress2 == 'undefined') {
            this.galleryuploadProgress2 = ProgressValue;
          }
          else if (this.galleryuploadProgress3 == null || this.galleryuploadProgress3 == "" || this.galleryuploadProgress3 == 'undefined') {
            this.galleryuploadProgress3 = ProgressValue;
          }
          else if (this.galleryuploadProgress4 == null || this.galleryuploadProgress4 == "" || this.galleryuploadProgress4 == 'undefined') {
            this.galleryuploadProgress4 = ProgressValue;
          }
        }
        if (event.partialText == "file uploaded") {
          this.loadingLoading = false; // Flag variable
          this.isfileUploaded = true;

          // Add code for preview uploaded image by shahi
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (this.GalleryPath1 == null || this.GalleryPath1 == "" || this.GalleryPath1 == 'undefined') {
              this.GalleryPath1 = this.filegallery.name;
              this.GalleryImageUrl1 = e.target.result;
            }
            else if (this.GalleryPath2 == null || this.GalleryPath2 == "" || this.GalleryPath2 == 'undefined') {
              this.GalleryPath2 = this.filegallery.name;
              this.GalleryImageUrl2 = e.target.result;
            }
            else if (this.GalleryPath3 == null || this.GalleryPath3 == "" || this.GalleryPath3 == 'undefined') {
              this.GalleryPath3 = this.filegallery.name;
              this.GalleryImageUrl3 = e.target.result;
            }
            else if (this.GalleryPath4 == null || this.GalleryPath4 == "" || this.GalleryPath4 == 'undefined') {
              this.GalleryPath4 = this.filegallery.name;
              this.GalleryImageUrl4 = e.target.result;
            }
          };
          reader.readAsDataURL(this.filegallery);

        }
        else {
          this.loadingLoading = false;
          this.isfileUploaded = false;
        }
      });
    }
    this.loadingLoading = false;
  }
  cancelgallery1() {
    if (this.galleryuploadSub) {
      this.galleryuploadSub.unsubscribe();
    }
    this.filegallery = null;
    this.galleryuploadProgress1 = null;
    this.galleryuploadSub = null;
    this.GalleryImageUrl1 = '';
    this.GalleryPath1 = null;
  }
  cancelgallery2() {
    if (this.galleryuploadSub) {
      this.galleryuploadSub.unsubscribe();
    }
    this.galleryuploadSub = null;
    this.filegallery = null;
    this.galleryuploadProgress2 = null;
    this.GalleryImageUrl2 = '';
    this.GalleryPath2 = null;
  }
  cancelgallery3() {
    if (this.galleryuploadSub) {
      this.galleryuploadSub.unsubscribe();
    }
    this.galleryuploadSub = null;
    this.filegallery = null;
    this.galleryuploadProgress3 = null;
    this.GalleryImageUrl3 = '';
    this.GalleryPath3 = null;
  }
  cancelgallery4() {
    if (this.galleryuploadSub) {
      this.galleryuploadSub.unsubscribe();
    }
    this.galleryuploadSub = null;
    this.filegallery = null;
    this.galleryuploadProgress4 = null;
    this.GalleryImageUrl4 = '';
    this.GalleryPath4 = null;
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loadingLoading = true;
    this.uploadProgress = "100";
    if (this.file) {
      this.loadingLoading = true;
      this.uploadSub = this.uploadService.uploadBusinessImage(this.file).subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total)).toString() + "%";
        }
        if (event.partialText == "file uploaded") {
          this.loadingLoading = false; // Flag variable
          this.isfileUploaded = true;

          // Add code for preview uploaded image by shahi
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.logoPath = this.file.name;
            this.BusinessImageUrl1 = e.target.result;
          };
          reader.readAsDataURL(this.file);
          // end 
        }
        else {
          this.loadingLoading = false;
          this.isfileUploaded = false;
        }
      });
    }
    this.loadingLoading = false;
  }
  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
    this.uploadProgress = "0%";
    this.reset();
  }

  reset() {
    this.file = null;
    this.uploadProgress = null;
    this.uploadSub = null;
    this.BusinessImageUrl1 = '';
    this.logoPath = null;
  }

  onChange1(event) {
    this.file1 = event.target.files[0];
  }

  onUpload1() {
    this.loadingLoading = true;
    this.uploadProgress1 = "100";

    if (this.file1) {
      this.loadingLoading = true;
      this.uploadSub1 = this.uploadService.uploadBusinessImage(this.file1).subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress1 = Math.round(100 * (event.loaded / event.total)).toString() + "%";
        }
        if (event.partialText == "file uploaded") {
          this.loadingLoading = false; // Flag variable
          this.isfileUploaded1 = true;
          // Add code for preview uploaded image by shahi
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.imagePath = this.file1.name;
            this.BusinessImageUrl2 = e.target.result;
          };

          reader.readAsDataURL(this.file1);
          // end 
        } else {
          this.loadingLoading = false;
          this.isfileUploaded1 = false;
          this.BusinessImageUrl2 = '';
        }
      });
    }
    this.loadingLoading = false;
  }
  cancelUpload1() {
    if (this.uploadSub1) {
      this.uploadSub1.unsubscribe();
    }
    this.uploadProgress1 = "0%";
    this.reset1();
  }

  reset1() {
    this.file1 = null;
    this.uploadProgress1 = null;
    this.uploadSub1 = null;
    this.BusinessImageUrl2 = '';
    this.imagePath = null;
  }

  GetBusinessLabels() {
    let details = [];
    this.selectedBusiness.forEach((element: any) => {
      let tempdefDetails = {
        "uniqueID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "id": 0,
        "labelID": element.id,
        "businessID": this.businessID,
        "isActive": true,
        "createdBy": AppSettings.GetCreatedBy(),
        "createdDate": AppSettings.GetDate(),
        "lastModifiedBy": AppSettings.GetCreatedBy(),
        "lastModifiedDate": AppSettings.GetDate()
      }
      details.push(tempdefDetails);
    });

    return details;
  }

  GetBusinessWorkingHours() {
    let details = [];
    let tempdefDetails = {
      "uniqueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "id": 0,
      "businessId": this.businessID,
      "monFromTime": this.ProfileFormGroup.controls['monFromTime'].value,
      "monToTime": this.ProfileFormGroup.controls['monToTime'].value,
      "tueFromTime": this.ProfileFormGroup.controls['tueFromTime'].value,
      "tueToTime": this.ProfileFormGroup.controls['tueToTime'].value,
      "wedFromTime": this.ProfileFormGroup.controls['wedFromTime'].value,
      "wedToTime": this.ProfileFormGroup.controls['wedToTime'].value,
      "thuFromTime": this.ProfileFormGroup.controls['thuFromTime'].value,
      "thuToTime": this.ProfileFormGroup.controls['thuToTime'].value,
      "friFromTime": this.ProfileFormGroup.controls['friFromTime'].value,
      "friToTime": this.ProfileFormGroup.controls['friToTime'].value,
      "satFromTime": this.ProfileFormGroup.controls['satFromTime'].value,
      "satToTime": this.ProfileFormGroup.controls['satToTime'].value,
      "sunFromTime": this.ProfileFormGroup.controls['sunFromTime'].value,
      "sunToTime": this.ProfileFormGroup.controls['sunToTime'].value,
      "isActive": true,
      "createdBy": AppSettings.GetCreatedBy(),
      "createdDate": AppSettings.GetDate(),
      "lastModifiedBy": AppSettings.GetCreatedBy(),
      "lastModifiedDate": AppSettings.GetDate(),
    }
    details.push(tempdefDetails);

    return details;
  }

  Submit() {
    this.submitted = true;
    console.log(this.ProfileFormGroup.invalid);
    if (this.ProfileFormGroup.invalid) {
      return;
    }

    if (this.selectedBusiness.length == 0) {
      this.labelsReq = true;
      return;
    }
    console.log("out")
    this.isLoading = true;
    let details = {
      "uniqueId": this.uniqueId,
      "id": this.id,
      "legalName": this.ProfileFormGroup.controls['businessName'].value,
      "businessName": this.ProfileFormGroup.controls['shortName'].value,
      "adress": this.ProfileFormGroup.controls['address'].value,
      "phoneNo": this.ProfileFormGroup.controls['phoneNo'].value,
      "pinCode": this.ProfileFormGroup.controls['pinCode'].value,
      "industry": this.ProfileFormGroup.controls['industry'].value,
      "descriptions": this.ProfileFormGroup.controls['description'].value,
      "logoPath": this.logoPath,
      "imagePath": this.imagePath,
      "website": this.ProfileFormGroup.controls['website'].value,
      "facebookUrl": this.ProfileFormGroup.controls['facebookUrl'].value,
      "twitterUrl": this.ProfileFormGroup.controls['twitterUrl'].value,
      "googleUrl": this.ProfileFormGroup.controls['googleUrl'].value,
      "instagramUrl": this.ProfileFormGroup.controls['instagramUrl'].value,
      "latitude": this.latitude,
      "longitude": this.longitude,
      "yelpUrl": this.ProfileFormGroup.controls['yelpUrl'].value,
      "stateId": 0,
      "isActive": true,
      "businessGroupId": this.businessGroupID.id,
      "createdBy": AppSettings.GetCreatedBy(),
      "createdDate": AppSettings.GetDate(),
      "lastModifiedBy": AppSettings.GetCreatedBy(),
      "lastModifiedDate": AppSettings.GetDate(),
      "stateCodeID": this.ProfileFormGroup.controls['stateCodeId'].value,
      "city": this.ProfileFormGroup.controls['city'].value,
      "businesswiseLabels": this.GetBusinessLabels(),
      "businesswiseWorkingDays": this.GetBusinessWorkingHours(),
      "galleryImagePath1": this.GalleryPath1,
      "galleryImagePath2": this.GalleryPath2,
      "galleryImagePath3": this.GalleryPath3,
      "galleryImagePath4": this.GalleryPath4,
      "isAgeRestriction": this.isAgeRestriction
    }

    console.log(details)

    this.profileSettingService.PutBusinessProfile(details.id, details)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.submitted = false;
          this.iseditmode = false;
          this.isAgeRestriction = false;
          this.ProfileFormGroup.reset();
          this.GetBusinessProfilesByGroupID();
        },
        error: error => {
          this.isLoading = false;
          this.iseditmode = true;
          this.submitted = false;
        }
      });
  }
}