import { Component, OnInit } from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router, private service: SendUserDetailsService) { }

  addNewUser(username, password, userID) {
    this.service.addNewUser(username, password, userID);
  }

  ngOnInit() {
  }

}
