import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(){
    this.userService.getUsers().subscribe(users=>{
      this.users = users;
    })
  }


  delete(user: User): void{
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
        this.userService.delete(user.id).subscribe(response=>{
          this.users = this.users.filter(usr=> usr !== user);
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },error => {
          swal.fire(
            'Oops!',
            'something went wrong.',
            'error'
          )
        })

      }
    })

  }
}
