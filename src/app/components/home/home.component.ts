import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router){}

  EspaseClient(){
    localStorage.setItem("role","client")
    this.router.navigateByUrl("admin/client/list");
  }

  EspaceAdmin(){
    localStorage.setItem("role","admin")
    this.router.navigateByUrl("admin/client/list");
  }

}
