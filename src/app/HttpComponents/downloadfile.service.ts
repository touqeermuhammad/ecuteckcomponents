import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DownloadFileService {

  constructor(private http: HttpClient) { }

  public async DownloadFile(url): Observable<Object> {

    const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic dG91cWVlckBlY3V0ZWsuY29tOiQyeSQxMiR1U2VRREQvYS4zRWZYeHlFaG5tSHhPUXQvUi5XZVZDa05rZWxOMXdZVVZIWTA5UUdsMXFDVw==',
            }),
            responseType: 'blob' as 'json'
          };

    return this.http.get(url, httpOptions);
  }
}