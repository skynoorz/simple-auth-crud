import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './users/form/form.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {IconsModule, TableModule} from "angular-bootstrap-md";

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'users/page/:page', component: UsersComponent},
  {path: 'users/form', component: FormComponent},
  {path: 'users/form/:id', component: FormComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    FormComponent,
    LoginComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    TableModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
