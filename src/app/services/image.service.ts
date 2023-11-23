import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imgUrl = environment.imageUrl;

  constructor(private http: HttpClient) { }

  // service methods
  createImage(body: any) {
    return this.http.post(this.imgUrl, body);
  }

  getImageByUser(id: number): Observable<any> {
    return this.http.get(`${this.imgUrl}/user/${id}`);
  }
}
