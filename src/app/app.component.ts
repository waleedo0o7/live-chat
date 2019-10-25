import { Component, Input, Output, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendUserDetailsService } from './shared/send-user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'live-chat';


  constructor( private service:SendUserDetailsService) {
  }

  ngOnInit() {
  }
}