import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(private userService: UserService) {}
  forgetPasswordUser(email: any) {
    this.userService.forgotPassword(email).subscribe();
  }
}
