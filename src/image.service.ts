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
  
  public postImage(url: string, image: string, uuid: string, headers?: Header[]) {
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }
    
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();

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

      let request: string = JSON.stringify({'uuid' : uuid , 'codedimage' : image})

      xhr.open('POST', url, true);

      if (headers)
        for (let header of headers)
          xhr.setRequestHeader(header.header, header.value);

      xhr.send(request);
    });
  }
}
