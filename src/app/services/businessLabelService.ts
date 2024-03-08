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

export class BusinessLabelService {
    constructor(private _http: HttpClient, private _Route: Router) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/BusinessLabels/";

    public GetBusinessLabelsByBusinessID() {
        return this._http.get<any>(this.apiUrl)
        .pipe(map(data => {
            return data;
        }));

        // return this._http.get<any>(this.apiUrl + "GetBusinessLabels")
        //     .pipe(map(member => {
        //         return member;
        //     }));
    }
}