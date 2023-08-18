import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userImage: string = '';
  returnUrl = '';
  constructor(
    private user: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.user.userReload();
  }
  signUp(data: any) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', this.userImage);
    this.user.userSignUp(formData).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.userImage = event.target.files[0];
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
}
