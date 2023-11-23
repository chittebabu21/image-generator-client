import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg = '';
  loggedIn = false;
  token = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.userService.login(this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            // get response
            const jsonResponse = response as any;
            console.log('Logged in successfully!');
            this.errorMsg = '';

            // save to local storage
            this.userService.set('token', jsonResponse.token);
            this.userService.set('user', jsonResponse.user.user_id);

            // check if user is admin
            if (jsonResponse.user.user_email === environment.adminEmail) {
              this.router.navigate(['/admin']);
              this.loginForm.reset();
            } else {
              // navigate to home
              this.router.navigate(['/home']);
              this.loginForm.reset();
            }
          },
          error: () => {
            console.error('Error in logging in...');
            this.errorMsg = 'Invalid credentials. Please try again...';
            this.loginForm.reset();
          }
        });
    }
  }
}
