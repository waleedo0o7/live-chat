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
    debugger;
    this.service.login(username,password);
    debugger;
  }


  ngOnInit() {
  }

}
