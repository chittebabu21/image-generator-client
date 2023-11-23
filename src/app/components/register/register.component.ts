import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; 
  errorMsg = '';
  isValid = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/)])
    });
  }

  f(): any {
    return this.registerForm.controls;
  }

  onRegister() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const userPassword = this.registerForm.get('user_password')?.value;
      const confirmPassword = this.registerForm.get('confirm_password')?.value;

      if (userPassword === confirmPassword) {
        console.log(this.registerForm.value);

        // take out only the required data from the form
        const { user_email, user_password } = this.registerForm.value;

        // call service method
        this.userService.register({ user_email, user_password })
          .subscribe({
            next: () => {
              this.errorMsg = '';
              console.log('Registration successful!');
              this.router.navigate(['/']);
              this.registerForm.reset();
            },
            error: (error) => {
              this.errorMsg = 'Unable to register now. Please try again...'
              console.error(error);
              this.registerForm.reset();
            }
          });
      } else {
        this.errorMsg = 'Passwords do not match. Please try again...';
        this.registerForm.reset();
      }
    } else {
      console.error('Error in registering...');
      this.errorMsg = 'All fields are mandatory...';
      this.registerForm.reset();
    }
  }
}
