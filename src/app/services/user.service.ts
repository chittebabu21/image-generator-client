import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url of user service in node
  private userUrl = environment.userUrl;

  constructor(private http: HttpClient) { }

  // create new user
  createUser(user: any) {
    return this.http.post(this.userUrl, user);
  }

  // get all users
  getAllUsers() {
    return this.http.get(this.userUrl);
  }

  // login service method
  login(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      user_email: body.user_email,
      user_password: body.user_password
    };

    return this.http.post(`${this.userUrl}/login`, payload, { headers: headers });
  }

  // register service
  register(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      user_email: body.user_email,
      user_password: body.user_password
    };

    return this.http.post(`${this.userUrl}`, payload, { headers: headers });
  }

  // logout method
  logout() {
    localStorage.clear();
  }

  // method to set, get and clear tokens from localstorage
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return storedValue;
    } else {
      return null;
    }
  }
}
