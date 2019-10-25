import { Component, Input, Output, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'live-chat';

  constructor() {
  }

  ngOnInit() {
    
  }
}