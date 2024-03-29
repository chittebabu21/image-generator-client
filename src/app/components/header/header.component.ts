import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isLoggedIn = true;

  constructor(private userService: UserService, private router: Router) {}

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
