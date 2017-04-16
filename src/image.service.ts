import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import { Http, Headers, RequestOptions } from '@angular/http';

export interface Header {
  header: string;
  value: string;
}

@Injectable()
export class ImageService {
  constructor(private http: Http){

  }
  
  public postImage(url: string, image: string, headers?: Header[]) {
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }/*
    let headers_ = new Headers({'Content-Type': 'application/json'});
    let requestOptions = new RequestOptions({headers_: headers});
    return this.http.post(url, { 'uuid' : '78', 'codedimage': image}, requestOptions)
      .catch(this.handleError)*/
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('uuid','78')
      formData.append('codedimage', image);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next({response: xhr.response, status: xhr.status});
            observer.complete();
          } else {
            observer.error({response: xhr.response, status: xhr.status});
          }
        }
      };

      xhr.open('POST', url, true);

      if (headers)
        for (let header of headers)
          xhr.setRequestHeader(header.header, header.value);

      xhr.send(formData);
    });
  }
  private handleError( error: any ) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
