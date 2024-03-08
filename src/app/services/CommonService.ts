import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { AppSettings } from "./Constants";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(private _http: HttpClient, private _Route: Router) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/BusinessProfiles/";
    public GetBussinessProfilesByGroupID(businessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetBusinessProfilesByGroupID/" + businessGroupID)
            .pipe(map(data => {
                return data;
            }));
    }
}