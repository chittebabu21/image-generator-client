import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: IUser[] = [];
  adminEmail = environment.adminEmail;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log(response);
        this.users = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDelete(id: number) {
    // remove the padded zeros
    const formattedId = Number(id);

    // window confirm pop up
    const isConfirmed = window.confirm('Do you want to delete this user?');

    // check if user confirms
    if (isConfirmed) {
      this.adminService.deleteUserById(formattedId).subscribe({
        next: (response: any) => {
          console.log(response);
  
          // update the new users list
          this.users = this.users.filter(user => user.user_id !== formattedId);
  
          // detect changes
          this.cdr.detectChanges();
          console.log(this.users);
          
          // send alert to user
          alert('User deleted successfully!');
        },
        error: (error) => {
          console.error(error);
          alert('Error in deleting user...');
        }
      });
    }
  }

  onRefresh() {
    window.location.reload();
  }
}
