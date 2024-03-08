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
export class LoginService {
    constructor(private _http: HttpClient, private _Route: Router) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/Users/";

    public login(username: string, password: string) {
        return this._http.get<any>(this.apiUrl + username + "/" + password)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }));
    }

    public PutUserAccountInfoInWeb(userData) {
        return this._http.put<any>(this.apiUrl + "PutUserAccountInfoInWeb/", userData)
            .pipe(map(data => {
                return data;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('UserData');
        localStorage.removeItem('selectedBusiness');
        localStorage.removeItem('Business');
        // this.currentUserSubject.next(null);
    }
}
