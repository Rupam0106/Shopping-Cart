import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
 
  constructor(private user: UserService) {}
  signUp(data: any) {
    const file: File = data.file[0];
    const reader = new FileReader();
    console.log(data.file)
    console.log(file)
    // this.user.userSignUp(data);
  }
}
