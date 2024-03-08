import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './Constants';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = AppSettings.API_ENDPOINT + "/api/Announcements";

  constructor(private http: HttpClient) {}

  uploadAnnouncement(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }

  uploadBusinessImage(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.http.request(req);
  }
}
