import { Component } from '@angular/core';
import { ImageGeneratorService } from 'src/app/services/image-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  prompt = '';
  imageUrl = '';
  isLoading = false;

  constructor(private imageGenService: ImageGeneratorService) {}

  // method to call service
  onSubmit(): void {
    this.isLoading = true;

    this.imageGenService.generateImage(this.prompt).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.imageUrl = response.imageUrl;
        console.log(this.imageUrl);
        this.prompt = '';
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  // method to construct absolute URL for images
  // getImageUrl(relativeUrl: string): string {
  //   relativeUrl = relativeUrl.replace(/^\./, '');
  //   return `http://localhost:4000${relativeUrl}`;
  // }
}
