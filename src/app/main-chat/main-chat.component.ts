import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {

  constructor(public service: SendUserDetailsService , public http:HttpClient , public router: Router, private firestore: AngularFirestore , public afs: AngularFirestore, public afAuth: AngularFireAuth,public ngZone: NgZone) {}

  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      if (user) {

        this.service.mainLoginedUserData = user;

        localStorage.setItem('user', JSON.stringify(this.service.mainLoginedUserData));
        JSON.parse(localStorage.getItem('user'));

        let oneUser = this.firestore.collection('users').doc(user.uid);
        let userDoc = oneUser.get();
    
        userDoc.subscribe(documentsSnapshot => {
          let item = documentsSnapshot.data();
          this.service.loginedUserData  =  item ;
          if( item['displayName'] ) {
            this.service.loginedUserData.displayName = item['displayName']
          } else {
            this.service.loginedUserData.displayName = 'Default Name';
          }


          if( item['photoURL'] ) {
            this.service.loginedUserData.photoURL = item['photoURL']
          } else {
            this.service.loginedUserData.photoURL = 'http://chat.waleedsa3ed.com/assets/new-user.svg';
          }
        })        
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }

}
