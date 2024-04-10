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

export class StateService {
    constructor(private _http: HttpClient, private _Route: Router) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/States/";

    public GetStatesByCountryID(countryId: any) {
        return this._http.get<any>(this.apiUrl + "GetStatesByCountryID/" + countryId)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetStates() {
        return this._http.get<any>(this.apiUrl).pipe();
    }
}