import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { catchError, switchMap, takeWhile, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppSettings } from './Constants';

@Injectable({
    providedIn: 'root'
})

export class TagDefinationService {
    constructor(private _http: HttpClient, private _Route: Router) { }
    private apiUrl = AppSettings.API_ENDPOINT + "/api/TagDefinations/";

    public GetTagDefinationsByBusinessGroupID(bussinessID) {
        return this._http.get<any>(this.apiUrl + "GetTagDefinationsByBusinessGroupID/" + bussinessID)
            .pipe(map(member => {
                return member;
            }));
    }
    public PutTagDefinationByTagID(tagid, tag) {
        return this._http.put<any>(this.apiUrl + "PutTagDefinationByTagID/" + tagid, tag)
            .pipe(map(member => {
                return member;
            }));
    }
    public PostTagDefinationByTagID( tag) {
        return this._http.post<any>(this.apiUrl + "PostTagDefinationByTagID", tag)
            .pipe(map(member => {
                return member;
            }));
    }
    public UpdateSingleTagByID(tagid) {

        return this._http.delete<any>(this.apiUrl + "UpdateSingleTagByID/"+ tagid)
            .pipe(map(member => {
                return member;
            }));
    }
    
    public PutTagByTagID(tagid) {
        return this._http.delete<any>(this.apiUrl + "PutTagByTagID/" + tagid)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetTagsByBusinessGroupID(bussinessGroupID) {
        return this._http.get<any>(this.apiUrl + "GetTagsByBusinessGroupID/" + bussinessGroupID)
            .pipe(map(member => {
                return member;
            }));
    }
    public GetTagsByBusinessID(bussinessID) {
        return this._http.get<any>(this.apiUrl + "GetTagsByBusinessID/" + bussinessID)
            .pipe(map(member => {
                return member;
            }));
    }

    public GetMemberProfileByTagId(businessGroupID, tagId) {
        return this._http.get<any>(this.apiUrl + "GetMemberProfileByTagId/" + businessGroupID + '/' + tagId)
            .pipe(map(member => {
                return member;
            }));
    }
}