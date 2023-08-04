import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: any = [];
  constructor(private userServie: UserService) {
    this.userServie.getUserDetails().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }

  deleteProfile() {
    this.userServie.deleteUser().subscribe();
  }
}
