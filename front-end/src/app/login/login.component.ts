import {Component, OnInit} from '@angular/core';
import {User} from "../users/user";
import swal from "sweetalert2";
import {AuthService} from "../users/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    title: string = 'Please sign in';
    user: User

    constructor(private authService: AuthService,
                private router: Router) {
        this.user = new User();
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()){
            swal.fire('Login', `Hi ${this.authService.user.username} you have already logged in.`, 'info')
            this.router.navigate(['/users']);
        }
    }

    login(): void {
        if (this.user.username == null || this.user.password == null) {
            swal.fire('Error login', 'Username o Password vacias!', 'error');
        }

        this.authService.login(this.user).subscribe(response => {
            console.log(response);

            this.authService.saveUser(response.access_token);
            this.authService.saveToken(response.access_token);

            let user = this.authService.user;

            this.router.navigate(['/users']);
            swal.fire('Login', `Hi ${user.username}, welcome and enjoy!`, 'success');
        }, error => {
            if (error.status == 400) {
                swal.fire('Login', `The credentials are invalid.`, 'error');
            }
        })
    }

}
