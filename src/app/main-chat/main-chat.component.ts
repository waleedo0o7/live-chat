import { Component, OnInit } from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {

  constructor(private service: SendUserDetailsService ) { }

  ngOnInit() {
  }

}
