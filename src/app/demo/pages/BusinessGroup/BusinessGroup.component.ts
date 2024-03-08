import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { BusinessGroupService } from '../../../services/BusinessGroupService';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from '../../../services/ToastService';
import { AppSettings } from '../../../services/Constants';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FileUploadService } from '../../../services/fileuploadservie';

export interface PeriodicElement {
    id: string;
    businessGroupName: string;
    packageTypeName: string;
}
@Component({
    selector: 'app-BusinessGroup',
    templateUrl: './BusinessGroup.component.html',
    styleUrls: ['./BusinessGroup.component.scss']
})
export class BusinessGroupComponent {
    isLoading = false;
    displayedColumns: string[] = ['businessGroupName', 'packageTypeName', 'Action'];
    public dataSource = new MatTableDataSource<PeriodicElement>();
    public dataSourceForFilter = new MatTableDataSource<PeriodicElement>();
    public filtereddata: any = [];
    buttonname = "";
    pageEvent: PageEvent;
    packageTypeData: any = [];
    submitted: boolean = false;
    isSubmitted: boolean = false;
    loading = false;
    iseditmode = false;
    dropdownSettingsSingle: IDropdownSettings = {};
    ProfileFormGroup: FormGroup;
    selectedpackageType: any = [];
    file: File = null;
    uploadProgress: any;
    loadingLoading: boolean = false;
    uploadSub: Subscription;
    isfileUploaded = false;
    annImage: any;
    fileName: any;
    filePath: any;
    BusinessImageUrl1: any;
    logoPath: any;
    id: any;
    constructor(private _businessGroupService: BusinessGroupService, public toastService: ToastService,
        private _liveAnnouncer: LiveAnnouncer, private uploadService: FileUploadService) {
        this.ProfileFormGroup = new FormGroup({
            id: new FormControl(''),
            BusinessgroupName: new FormControl('', Validators.required),
            PackageID: new FormControl('', Validators.required)
        })
    }
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebutton1') closebutton1;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.GetBusinessGroup();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.packageTypeData = [{ id: 2, PackageName: 'Basic' },
        { id: 3, PackageName: 'Advanace' }, { id: 4, PackageName: 'Premium' }];
        this.selectedpackageType = [
            { id: 0, PackageName: '' }
        ];
        this.dropdownSettingsSingle = {
            idField: 'id',
            textField: 'PackageName',
            singleSelection: true
        }
    }
    GetBusinessGroup() {
        this.isLoading = true;
        this._businessGroupService.GetBusinessGroups().pipe()
            .subscribe({
                next: (data) => {
                    this.dataSource.data = data;
                    this.filtereddata = data;
                    this.dataSourceForFilter.data = this.dataSource.data;
                    this.loading = false;
                    this.isLoading = false;
                },
                error: error => {
                    console.log(error);
                    this.isLoading = false;
                }
            });
    }
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
    Cancle() {
        this.iseditmode = false;
        this.submitted = false;
        this.isfileUploaded = true;
        this.fileName = null;
        this.logoPath = null;
        this.uploadProgress = null;
        this.buttonname = "Cancel";
        this.file = null;
        this.BusinessImageUrl1 = '';
        this.uploadProgress = undefined;
        this.id = 0;
    }
    AddNew() {
        this.Cancle();
        this.iseditmode = true;
        this.submitted = false;
        this.ProfileFormGroup.reset();

    }
    Save() {
        this.iseditmode = true;
        this.submitted = true;
        if (this.ProfileFormGroup.invalid) {
            return;
        }
        this.isLoading = true;
        let details = {
            "uniqueId": AppSettings.NewGUID(),
            "id": this.id,
            "businessGroupName": this.ProfileFormGroup.controls['BusinessgroupName'].value,
            "isActive": AppSettings.Active,
            "createdBy": AppSettings.GetCreatedBy(),
            "createdDate": AppSettings.GetDate(),
            "lastModifiedBy": AppSettings.GetLastModifiedBy(),
            "lastModifiedDate": AppSettings.GetDate(),
            "logoPath": this.logoPath,
            "packageTypeID": (this.ProfileFormGroup.controls['PackageID'].value)[0].id
        }
        if (this.id == 0) {
            this._businessGroupService.PostBusinessGroup(details)
                .subscribe({
                    next: (data) => {
                        this.isLoading = false;
                        this.submitted = false;
                        this.iseditmode = false;
                        this.ProfileFormGroup.reset();
                        this.GetBusinessGroup();
                    },
                    error: error => {
                        this.isLoading = false;
                        this.iseditmode = true;
                        this.submitted = false;
                    }
                });
        }
        else {
            this._businessGroupService.PutBusinessGroup(this.id, details)
                .subscribe({
                    next: (data) => {
                        this.isLoading = false;
                        this.submitted = false;
                        this.iseditmode = false;
                        this.ProfileFormGroup.reset();
                        this.GetBusinessGroup();
                    },
                    error: error => {
                        this.isLoading = false;
                        this.iseditmode = true;
                        this.submitted = false;
                    }
                });
        }


    }
    async Edit(id) {
        this.Cancle();
        this.iseditmode = true;
        this.id = id;
        await this._businessGroupService.GetBusinessGroupByID(id).pipe()
            .subscribe({
                next: async (data) => {
                    await this.SetData(data);

                },
                error: error => {
                    this.iseditmode = true;
                }
            });
    }
    async SetData(data) {
        this.logoPath = data['logoPath'];
        if (data['logoPath'] != null && data['logoPath'] != "") {
            this.BusinessImageUrl1 = AppSettings.API_ENDPOINT + "/" + data['logoPath'].replace(" ", "%20");
        }
        if (this.logoPath != '') {
            this.uploadProgress = "100%";
        }
        this.selectedpackageType = [
            { id: data.packageTypeID, PackageName: data.packageTypeName }
        ];
        await this.ProfileFormGroup.setValue({
            id: data.id,
            BusinessgroupName: data.businessGroupName,
            PackageID: this.selectedpackageType
        });
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
}