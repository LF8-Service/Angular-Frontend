import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {AuthenticationService} from "../services/AuthenticationService";

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    onLogin() {
        this.authService.login(this.username, this.password).then(
            data => {
                if (data) {
                    console.log('Login success', data);
                    this.router.navigate(['/home']);
              } else {
                    this.errorMessage = 'Login failed: no token received';
                    console.log(this.errorMessage);
                }
            }
        ).catch(
            error => {
                this.errorMessage = 'Login failed: ' + error.message;
                console.error(this.errorMessage);
            }
        );
    }
}
