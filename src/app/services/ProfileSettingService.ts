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

export class ProfileSettingService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/BusinessProfiles/";

    public GetBusinessProfilesByID(id) {
        return this._http.get<any>(this.apiUrl + id)
            .pipe(map(data => {
                return data;
            }));
    }
    public GetBusinessProfiles() {
        return this._http.get<any>(this.apiUrl)
            .pipe(map(data => {
                return data;
            }));
    }
    public GetBusinessProfilesByGroupID(businessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetBusinessProfilesByGroupID/" + businessGroupID)
            .pipe(map(data => {
                return data;
            }));
    }
    public GetBusinessGroupesByUserID(userID) {
        return this._http.get<any>(this.apiUrl + "GetBusinessGroupesByUserID/" + userID)
            .pipe(map(data => {
                return data;
            }));
    }
    public PutBusinessProfile(id, businessProfile) {
        return this._http.put<any>(this.apiUrl + id, businessProfile)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetAllBusinessProfileList() {
        return this._http.get<any>(this.apiUrl + "GetBusinessProfileList")
            .pipe(map(data => {
                return data;
            }));
    }
     public PostBusinessProfile(businessProfile) {
        return this._http.post<any>(this.apiUrl , businessProfile)
            .pipe(map(member => {
                return member;
            }));
    }
}