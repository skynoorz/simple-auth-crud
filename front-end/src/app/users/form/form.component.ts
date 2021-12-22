import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  user: User = new User();
  title: string = "User form";

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id'];
      if (id)
        this.userService.getUser(id).subscribe(user=>{
          this.user = user;
        });
    })
  }

  public create(): void {
    console.log(this.user);
    this.userService.create(this.user).subscribe(response => {
      console.log("se creo el usuario:");
      console.log(response);
      swal.fire(
        '200 OK',
        'User created successfully',
        'success'
      )
      this.router.navigate(['/users']);
    })
  }

  update():void{
    console.log("userToSend: ",this.user);
    this.userService.update(this.user).subscribe(response=>{
      console.log("user: ",response.cliente);
      swal.fire(
        '200 OK',
        'User updated successfully',
        'success'
      )
      this.router.navigate(['/users'])
    })
  }

}
