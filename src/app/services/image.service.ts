import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imgUrl = 'http://localhost:4000/images/'

  constructor(private http: HttpClient) { }

  // service methods
  createImage(image: any) {
    return this.http.post(this.imgUrl, image);
  }

  getImageByUser(id: number): Observable<any> {
    return this.http.get(`${this.imgUrl}/user/${id}`);
  }
}
