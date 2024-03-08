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

export class ActivityHistoryService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/ActivityHistories/";

    public GetActivityDashboardByBusinessGroupId(bussinessGroupID,start, end) {
        return this._http.get<any>(this.apiUrl + "GetActivityDashboardByBusinessGroupId/" + bussinessGroupID + "/" + start + "/" + end)
            .pipe(map(member => {
                return member;
            }));
    }
}