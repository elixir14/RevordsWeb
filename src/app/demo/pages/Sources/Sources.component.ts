import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SourceService } from '../../../services/SourceService';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastService } from '../../../services/ToastService';
import { AppSettings } from '../../../services/Constants';
import { TagDefinationService } from '../../../services/TagDefinitionService';
import { CommonService } from '../../../services/CommonService';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { UtcConverterService } from 'src/app/services/UtcConverterService';
import { ProfileSettingService } from '../../../services/ProfileSettingService';

export interface PeriodicElement {
    id: string;
    sourceName: string;
    businessLocationName: string;
}

@Component({
    selector: 'app-Sources',
    templateUrl: './Sources.component.html',
    styleUrls: ['./Sources.component.scss']
})
export class SourcesComponent {
    isLoading = false;
    displayedColumns: string[] = ['sourceName', 'businessLocationName', 'Action'];
    public dataSource = new MatTableDataSource<PeriodicElement>();
    public dataSourceForFilter = new MatTableDataSource<PeriodicElement>();
    public filtereddata: any = [];
    public pageSize = 50;
    public currentPage = 0;
    public totalSize = 0;
    pageEvent: PageEvent;
    BusinessLocationData: any = [];
    submitted: boolean = false;
    isSubmitted: boolean = false;
    loading = false;
    iseditmode = false;
    dropdownSettingsSingle: IDropdownSettings = {};
    ProfileFormGroup: FormGroup;
    selectedBusinessLocation: any = [];
    id: any = 0;
    constructor(private _sourceService: SourceService, public toastService: ToastService,
        private _liveAnnouncer: LiveAnnouncer, private _profileSettingService: ProfileSettingService) {

        this.ProfileFormGroup = new FormGroup({
            id: new FormControl(''),
            SourceName: new FormControl('', Validators.required),
            BusinessLocationID: new FormControl('', Validators.required)
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
        this.GetSources();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dropdownSettingsSingle = {
            idField: 'businessId',
            textField: 'businessName',
            singleSelection: true
        }
    }

    GetSourcesData() {
        this.isLoading = true;
        this._profileSettingService.GetAllBusinessProfileList().pipe()
            .subscribe({
                next: (data) => {
                    this.BusinessLocationData = data;
                },
                error: error => {
                    console.log(error);
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
        this.id = 0;
        this.selectedBusinessLocation = [];
    }

    AddNew() {
        this.Cancle();
        this.iseditmode = true;
        this.submitted = false;
        this.ProfileFormGroup.reset();
        this.GetSourcesData();
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
            "sourceName": this.ProfileFormGroup.controls['SourceName'].value,
            "isActive": AppSettings.Active,
            "createdBy": AppSettings.GetCreatedBy(),
            "createdDate": AppSettings.GetDate(),
            "lastModifiedBy": AppSettings.GetLastModifiedBy(),
            "lastModifiedDate": AppSettings.GetDate(),
            "businessLocationId": (this.ProfileFormGroup.controls['BusinessLocationID'].value)[0].businessId
        }
        console.log(details);
        if (this.id == 0) {
            this._sourceService.PostSource(details)
                .subscribe({
                    next: (data) => {
                        this.isLoading = false;
                        this.submitted = false;
                        this.iseditmode = false;
                        this.ProfileFormGroup.reset();
                        this.GetSources();
                    },
                    error: error => {
                        this.isLoading = false;
                        this.iseditmode = true;
                        this.submitted = false;
                    }
                });
        }
        else {
            this._sourceService.PutSource(this.id, details)
                .subscribe({
                    next: (data) => {
                        this.isLoading = false;
                        this.submitted = false;
                        this.iseditmode = false;
                        this.ProfileFormGroup.reset();
                        this.GetSources();
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
        this.GetSourcesData();
        await this._sourceService.GetSourcesByID(id).pipe()
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
        this.selectedBusinessLocation = [
            { businessId: data.businessLocationID, businessName: data.businessLocationName }
        ];
        await this.ProfileFormGroup.setValue({
            id: data.id,
            SourceName: data.sourceName,
            BusinessLocationID: this.selectedBusinessLocation
        });
    }

    GetSources() {
        this.isLoading = true;
        this._sourceService.GetSources().pipe()
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
}