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

export class DefinationService {
    constructor(private _http: HttpClient, private _Route: Router) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/BadgeDefinations/";
    public GetBadgeDefinationsByBusinessGroupID(bussinessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetBadgeDefinationsByBusinessGroupID/" + bussinessGroupID)
            .pipe(map(member => {
                return member;
            }));
    }

    public PutBadgeDefinationByBadgeID(badgeid, badge) {
        return this._http.put<any>(this.apiUrl + "PutBadgeDefinationByBadgeID/" + badgeid, badge)
            .pipe(map(member => {
                return member;
            }));
    }

    public GetBadgeTagDetailsByBusinessID(bussinessID) {
        return this._http.get<any>(this.apiUrl + "GetBadgeTagDetailsByBusinessID/" + bussinessID)
            .pipe(map(member => {
                return member;
            }));
    }
    public UpdateSingleBadgeByID(BadgeID) {

        return this._http.delete<any>(this.apiUrl + "UpdateSingleBadgeByID/"+ BadgeID)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetBadgeTagDetailsByBusinessGroupID(businessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetBadgeTagDetailsByBusinessGroupID/" + businessGroupID)
            .pipe(map(member => {
                return member;
            }));
    }

    public GetMemberProfileByBadgeId(businessGroupID, badgeId) {
        return this._http.get<any>(this.apiUrl + "GetMemberProfileByBadgeId/" + businessGroupID + '/' + badgeId)
            .pipe(map(member => {
                return member;
            }));
    }
}