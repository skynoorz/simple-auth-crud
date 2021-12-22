import { Component, OnInit } from '@angular/core';
import {AuthService} from "../users/auth.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() :void{
    this.authService.logout();
    swal.fire('Logout', 'Logout successfully','success');
    this.router.navigate(['/login']);
  }
}
