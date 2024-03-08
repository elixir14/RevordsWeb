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

export class AnnouncementService {
    constructor(private _http: HttpClient, private _Route: Router) {

    }
    private apiUrl = AppSettings.API_ENDPOINT + "/api/Announcements/";

    public PostAnnouncements(announcement) {
        return this._http.post<any>(this.apiUrl, announcement)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetAnnouncementsByBusinessID(bussinessID, businessLocationID) {
        return this._http.get<any>(this.apiUrl + "GetAnnouncementsByBusinessGroupID/" + bussinessID + "/" + businessLocationID)
            .pipe(map(member => {
                return member;
            }));
    }
    public PreviewAnnouncmentMail(announcement) {
        return this._http.post<any>(this.apiUrl + "PreviewAnnouncmentMail/", announcement)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetAnnouncementByID(ID) {
        return this._http.get<any>(this.apiUrl + ID)
            .pipe(map(member => {
                return member;
            }));
    }
}