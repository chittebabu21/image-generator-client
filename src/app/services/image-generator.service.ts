import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageGeneratorService {
  // properties
  private imgGenApi = 'http://localhost:4000/image-generator';

  constructor(private http: HttpClient) { }

  // method to post to image generator api
  generateImage(prompt: string): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', prompt);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.imgGenApi}`, formData, { headers: headers });
  }
}
