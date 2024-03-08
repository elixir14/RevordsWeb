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

export class AutopilotConfigService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }
    // http://192.168.1.2:8016
    private apiUrl = AppSettings.API_ENDPOINT + "/api/AutoPilotConfigs/";

    public GetAutoPilotByBusinessGroupID(bussinessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetAutoPilotByBusinessGroupID/" + bussinessGroupID)
            .pipe(map(member => {
                return member;
            }));
    }

    public PutAutoPilotConfig(autoPilotConfig) {
        return this._http.put<any>(this.apiUrl, autoPilotConfig)
            .pipe(map(member => {
                return member;
            }));
    }

    public GetAutoPilotHistoryByBusinessGroupID(bussinessGroupID, startDate, endDate,location) {
        return this._http.get<any>(this.apiUrl + "GetAutoPilotHistoryByBusinessGroupID/" + bussinessGroupID + "/" + startDate + "/" + endDate + "/" + location)
            .pipe(map(member => {
                return member;
            }));
    }
}