import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface Configu{
  id;
  name;
  username;
  email;
}

export interface Config {
  success;
  token;
  user:Configu;
  msg;
}

export interface Config2 {
  user:Configu;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile:Config2) => {
      this.user = profile.user;
      console.log(this.user.name);
    },
     err => {
       console.log(err);
       return false;
     });
  }

}
