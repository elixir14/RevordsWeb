import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from './Constants'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class ActivityTypeService{
    constructor(private _http: HttpClient, private _router: Router){}

    private apiUrl = AppSettings.API_ENDPOINT + "/api/ActivityTypes";

    public GetActivityTypes(){
        return this._http.get<any>(this.apiUrl);
    }
}