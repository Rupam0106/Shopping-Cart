import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetToken: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.resetToken) {
        this.resetToken = params.resetToken;
      }
    });
  }
  resetPasswordUser(data: any) {
    this.userService.resetPassword(this.resetToken,data).subscribe();
  }
}
