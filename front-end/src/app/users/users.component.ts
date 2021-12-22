import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import swal from "sweetalert2";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  usernameFilter: string = '';
  paginator: any;

  constructor(private userService: UserService,
              public authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.loadUsers();
    else this.router.navigate(['/login'])
  }

  loadUsers() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) page = 0
      this.userService.getUsersPage(page).subscribe(response => {
        console.log("RESPONSE: ",response)
        this.users = response.content as User[];
        this.paginator = response;
      })
    })
  }

  filter(): void{
    this.userService.getUsersContaining(this.usernameFilter).subscribe(users=>{
      this.users= users;
    },error => {
      swal.fire('Oops..', 'Similar user not found');
    })
  }


  delete(user: User): void {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).subscribe(response => {
          this.users = this.users.filter(usr => usr !== user);
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }, error => {
          if (error.status == 403) {
            swal.fire(
              'Oops!',
              'It seems you dont have access to it. Are you logged as admin?',
              'error'
            )
          }
          console.log(error.message);
        })

      }
    })

  }
}
