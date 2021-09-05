import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router ,private service: SendUserDetailsService) { }

  

  login(username,password){
      try {
        if ( username === 'waleed' && password === "123") {
          localStorage.setItem("logined-user", JSON.stringify({username : username , id : 100}));
          this.router.navigate(['main-chat']);
        } else {
          alert("username: waleed - password 123");
        }
      } catch (err) {
        console.log(err);
      } 
  }

  ngOnInit() {
    localStorage.clear();
  }

}
