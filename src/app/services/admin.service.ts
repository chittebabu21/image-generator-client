import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private userUrl = environment.userUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.userUrl, { headers: headers, params: { origin: '*' }});
  }

  deleteUserById(id: number) {
    // get token from local storage
    const token = localStorage.getItem('token');

    // remove single quotes from the token
    const cleanedToken = token?.replace(/^['"](.*)['"]$/, '$1');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    console.log(headers);

    return this.http.delete(`${this.userUrl}/${id}`, { headers: headers });
  }
}
