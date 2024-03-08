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

export class BusinessGroupService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }
    private apiUrl = AppSettings.API_ENDPOINT + "/api/BusinessGroups/";
    public GetBusinessGroups() {
        return this._http.get<any>(this.apiUrl)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetBusinessGroupByID(id) {
        return this._http.get<any>(this.apiUrl+"GetBusinessGroupByID/"  + id)
        .pipe(map(member => {
            return member;
        }));
    }
    public PostBusinessGroup(data) {
        return this._http.post<any>(this.apiUrl , data)
            .pipe(map(member => {
                return member;
            }));
    }
   
    public PutBusinessGroup(userid, userProfile) {
        return this._http.put<any>(this.apiUrl  + userid, userProfile)
            .pipe(map(member => {
                return member;
            }));
    }
}