import { Component, OnInit } from '@angular/core';
import { ImageGeneratorService } from 'src/app/services/image-generator.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageGenForm!: FormGroup;
  imageName = '';
  imageUrl = '';
  errorMsg = '';
  spinnerActive = false;

  constructor(
    private imageGenService: ImageGeneratorService, 
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.imageGenForm = new FormGroup({
      prompt: new FormControl('', [Validators.required])
    });
  }

  // method to call service
  onSubmit(): void {
    if (this.imageGenForm.valid) {
      const prompt = this.imageGenForm.get('prompt')?.value;
      const userIdString = this.userService.get('user');
      
      if (userIdString) {
        // parse number back
        const userIdNumber = JSON.parse(userIdString);
        console.log(userIdNumber);

        // load spinner
        this.spinnerActive = true;

        // call image generator method
        this.imageGenService.generateImage(prompt).subscribe({
          next: (response) => {
            this.spinnerActive = false;
            this.imageName = response.imageName;
            this.imageUrl = `${environment.uploadsUrl}/${this.imageName}`;
            console.log(this.imageUrl);
  
            // call the image service method to post new image
            this.postImage({
              image_url: this.imageName,
              text_prompt: prompt,
              user_id: userIdNumber
            });
  
            // clear form
            this.errorMsg = '';
            this.imageGenForm.reset();
          },
          error: (error) => {
            this.spinnerActive = false;
            console.error(error);
            this.errorMsg = 'Invalid prompt...';
            this.imageGenForm.reset();
          }
        });
      }
    }
  }

  // post new image data
  postImage(body: any) {
    this.imageService.createImage(body)
      .subscribe({
        next: () => {
          console.log('Image data added to database!');
        },
        error: (error) => {
          console.error(`Error: ${error}`);
        }
      });
  }
}
