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
export class BillingService {
    constructor(private _http: HttpClient, private _Route: Router) {
    }

    private apiUrl = AppSettings.API_ENDPOINT + "/api/ClientInvoices/";
    private apiUrls = AppSettings.API_ENDPOINT + "/api/ClientPayments/";
    private paymentinfoapiUrl = AppSettings.API_ENDPOINT + "/api/PaymentInfoes/";

    public GetClientInvoicesByBusinessLocationId(BusinessLocationId) {
        return this._http.get<any>(this.apiUrl + "GetClientInvoicesByBusinessLocationId/" + BusinessLocationId )
            .pipe(map(member => {
                return member;
            }));
    }

    public GetClientPaymentsByBusinessLocationId(BusinessLocationId ) {
        return this._http.get<any>(this.apiUrls + "GetClientPaymentsByBusinessLocationId/" + BusinessLocationId )
            .pipe(map(member => {
                return member;
            }));
    }

    public GetPaymentInfoByLocationId( LocationId) {
        return this._http.get<any>(this.paymentinfoapiUrl + "GetPaymentInfoByBusinessLocationID/" + LocationId)
            .pipe(map(member => {
                return member;
            }));
    }

    public GetPaymentInfoById( Id) {
        return this._http.get<any>(this.paymentinfoapiUrl + Id)
            .pipe(map(member => {
                return member;
            }));
    }
    public PostPaymentInfo(paymentInfo) {
        return this._http.post<any>(this.paymentinfoapiUrl, paymentInfo)
            .pipe(map(member => {
                return member;
            }));
    }
    public PutPaymentInfo(id,paymentInfo) {
        return this._http.put<any>(this.paymentinfoapiUrl + id, paymentInfo)
            .pipe(map(member => {
                return member;
            }));
    }

}