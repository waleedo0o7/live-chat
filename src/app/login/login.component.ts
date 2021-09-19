import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(public router: Router ,public service: SendUserDetailsService) { }

  ngOnInit() {
    localStorage.clear();
    this.service.usersList = [];
    this.service.chatMessagesList = [];
    this.service.awayUserData = '';
  }

}
