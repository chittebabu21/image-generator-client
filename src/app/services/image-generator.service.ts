import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageGeneratorService {
  // properties
  private imgGenApi = environment.imgGenApi;

  constructor(private http: HttpClient) { }

  // get token from local storage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // method to post to image generator api
  generateImage(prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', prompt);

    // get the token
    const token = this.getToken();

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post(`${this.imgGenApi}`, formData, { headers: headers });
  }
}
