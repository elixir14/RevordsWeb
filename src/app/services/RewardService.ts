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

export class RewardService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }
    private apiUrl = AppSettings.API_ENDPOINT + "/api/RewardConfigs/";
    public GetRewardConfigByBusinessGroupId(bussinessID) {
        return this._http.get<any>(this.apiUrl + "GetRewardConfigByBusinessGroupId/" + bussinessID)
            .pipe(map(member => {
                return member;
            }));
    }
    public PostandPutRewardConfig( tag) {
        return this._http.post<any>(this.apiUrl + "PostandPutRewardConfig", tag)
            .pipe(map(member => {
                return member;
            }));
    }
}