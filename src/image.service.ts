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
    }
    
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      let request: string = JSON.stringify({'uuid' : '78' , 'codedimage' : image})

      xhr.open('POST', url, true);

      if (headers)
        for (let header of headers)
          xhr.setRequestHeader(header.header, header.value);

      xhr.send(request);
    });
  }
  private handleError( error: any ) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
