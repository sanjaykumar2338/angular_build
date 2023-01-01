import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../../src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ListingService  {
   Auth_Token=localStorage.getItem('token');
   logeduser=localStorage.getItem('logedUser');
   planurl = environment.apiUrl+'auth/profile/'+this.logeduser+'/RemainingListing';
   myplan: any;

  constructor(  private http: HttpClient ) { }

  getMyPlan()
  {
    console.log('tested');
    this.http.get(this.planurl, { headers: new HttpHeaders().set('Authorization', this.Auth_Token) }).subscribe(
      (res: any) => {
       console.log('tested1');
        return res.data;
      }
    )
  }

}
