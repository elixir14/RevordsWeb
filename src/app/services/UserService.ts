import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppSettings } from './Constants';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient) { }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/Users/";

    public GetUsers() {
        return this._http.get<any>(this.apiUrl)
            .pipe(map(member => {
                return member;
            }));
    }
    public PostUsers(data) {
        return this._http.post<any>(this.apiUrl, data)
            .pipe(map(member => {
                return member;
            }));
    }
    public PostMailSetPassword(data) {
        return this._http.post<any>(`${AppSettings.API_ENDPOINT}/api/Mail/SetPassword`, data)
            .pipe(map(data => {
                return data;
            }));
    }
    public PutUserProfile(userid, userProfile) {
        return this._http.put<any>(this.apiUrl + userid, userProfile)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetUsersByID(id) {
        return this._http.get<any>(this.apiUrl + id)
            .pipe(map(member => {
                return member;
            }));
    }
    public PutUserPassword(userid, password) {
        return this._http.put<any>(`${this.apiUrl}PutUserPassword/${userid}/${password}`, null)
            .pipe(map(data => {
                return data;
            }));
    }
    public PutUserForgotPasswordSendMail(userName) {
        return this._http.put<any>(`${this.apiUrl}PutUserForgotPasswordSendMail/${userName}`, null)
            .pipe(map(data => {
                return data;
            }));
    }
}