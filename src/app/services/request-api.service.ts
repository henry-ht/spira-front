import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variables } from './../helpers/variables';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private httpClient: HttpClient) { }

  public get(urlResources:string, urlParam = {}){
    return this.httpClient
            .get(Variables.urlApi+urlResources, {params: urlParam})
            .pipe( takeUntil(this.ngUnsubscribe) );
  }

  public save(urlResources:string, data:object, urlParam = {}){
    return this.httpClient
            .post(Variables.urlApi+urlResources, data, { params: urlParam })
            .pipe( takeUntil(this.ngUnsubscribe) );
  }

  public update(urlResources:string, data:object, urlParam = {}){
    return this.httpClient
            .put(Variables.urlApi+urlResources, data, {params: urlParam})
            .pipe( takeUntil(this.ngUnsubscribe) );
  }

  public delete(urlResources:string, urlParam = {}){
    return this.httpClient
            .delete(Variables.urlApi+urlResources, {params: urlParam})
            .pipe( takeUntil(this.ngUnsubscribe) );
  }

  public cancelRequest(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
