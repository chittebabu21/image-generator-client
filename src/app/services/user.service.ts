import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url of user service in node
  private userUrl = 'http://localhost:4000/users'

  constructor(private http: HttpClient) { }

  // create new user
  createUser(user: any) {
    return this.http.post(this.userUrl, user);
  }

  // login service method
  login(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      email: body.user_email,
      password: body.user_password
    };

    return this.http.post(`${this.userUrl}/login`, payload, { headers: headers });
  }

  // // register service
  // register(body: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   const payload = {
  //     username: body.name,
  //     email: body.email,
  //     user_password: body.password
  //   };

  //   return this.http.post(this.registerUrl, payload, { headers: headers });
  // }
}
