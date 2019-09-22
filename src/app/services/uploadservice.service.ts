import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable,of,throwError, observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { promise } from 'protractor';
const uploadURL="http://localhost:3000/upload";

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  constructor(private http:HttpClient) { }

public handleError(error: HttpErrorResponse | any) {

  let errMsg: string;

  if (error.error instanceof ErrorEvent) {
    errMsg = error.error.message;
  } else {
    errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
  }

  return throwError(errMsg);

}

upload(Data: FormData): Observable<string> {
console.log('meethod is called',Data);
  const httpOptions = {
      headers: new HttpHeaders ( {
      'Type': 'POST',
      'Content-Encoding': 'gzip' 
    })
  };

 return this.http.post<string>(uploadURL, Data, httpOptions).pipe(map((data) => {return data }))
  .pipe(catchError(this.handleError));

}



}