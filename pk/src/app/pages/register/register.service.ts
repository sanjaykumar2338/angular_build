import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})

export class RegisterService{
  uri = environment.apiUrl + "auth/register";

  constructor(private http: HttpClient) {}

  register(
    fname,
    lname,
    email,
    pass
  ) {
    const frmData = {
      firstname: 'test12',
      last_name: 'test12',
      email: 'sdfsdf@s.com',
      password: '1754',
      username: 'testastr'
    };

    console.log(frmData);
    return this.http.post(this.uri, frmData);
  }

}