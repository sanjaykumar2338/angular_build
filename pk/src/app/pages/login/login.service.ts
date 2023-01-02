import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class userLogin{
 
  logfeed: any;
  token: any;

  constructor(
    private fb: FormBuilder,
   private http: HttpClient,
  ) { 

  } 
  
 
  doLogin(uname, pass): Observable<any> {
    const url = environment.apiUrl + 'auth/login';    
    this.http
      .post(  url, { username:uname, password:pass } )
      .subscribe( res => {   
        console.log(res);
        this.logfeed = res;           
        localStorage.setItem('tokens', this.logfeed.token);
        this.token = localStorage.getItem('token');        
      }
    );
    console.log(uname);
    console.log(pass);
    return this.token;
  }

  
}
