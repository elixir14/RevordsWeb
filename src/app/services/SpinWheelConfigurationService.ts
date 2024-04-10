import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppSettings } from './Constants';

@Injectable({
    providedIn: 'root'
})

export class SpinWheelService {
    constructor(private _http: HttpClient, private _Route: Router) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/SpinWheelDefaultConfigurationHeaders/";

    public GetSpinWheeldefaultConfigByBusinessGroupID(bussinessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetSpinWheeldefaultConfigByBusinessGroupID/" + bussinessGroupID)
            .pipe(map(member => {
                return member;
            }));
    }

    public PutSpinWheeldefaultConfigurationDetails(headerId, spinRequired, spinData) {
        return this._http.put<any>(`${this.apiUrl}PutSpinWheeldefaultConfigurationDetails/${headerId}/${spinRequired}`, spinData )
            .pipe(map(data => {
                return data;
            }));
    }
}