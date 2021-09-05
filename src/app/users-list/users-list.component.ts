import { Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  constructor(private service: SendUserDetailsService  , private firestore: AngularFirestore ) {}

  toggleActiveClass(i){
    if ( this.service.usersList[i].isActive === false ) {
      for( let x = 0 ; x < this.service.usersList.length ; x++)  {
        this.service.usersList[x].isActive = false
      }
      this.service.usersList[i].isActive = true
    } else {
      this.service.usersList[i].isActive = false      
    }
  }

  searchedUsersList = this.service.usersList;
  loginedUser: any;
  searchedName: any;
  oldi: number = 0;


  usersListResult(searchedName:any) {
    
    let searchedNameLC = searchedName.toLowerCase(); 
    this.searchedUsersList = this.service.usersList.filter(function (oneUser: any) {
      return oneUser.displayName.toLowerCase().includes(searchedNameLC);
    })
  }





  ngOnInit() {

    this.service.getUsersFromFirebase();

    // this.service.getMessagesFromFirebase();

    // this.loginedUser = this.service.loginedUser;

    // this.service.getUsers().subscribe(documentsSnapshot => {
    //   this.service.usersList = documentsSnapshot.docs.map(document => {
    //     return {
    //       id: +document.id,
    //       password: document.data()['password'],
    //       name: document.data()['name'],
    //       state: document.data()['state'],
    //       img: document.data()['img']
    //     }
    //   })
    // })


    // this.service.listenForUsersChanges().subscribe(data => {
    //   this.service.usersList = data.map(snapShot => {

    //     // console.log('snapShot data');
    //     // console.log(snapShot.payload.doc.data());
        
    //     return {
    //       id: +snapShot.payload.doc.id,
    //       password: snapShot.payload.doc.data()['password'],
    //       name: snapShot.payload.doc.data()['name'],
    //       state: snapShot.payload.doc.data()['state'],
    //       img: snapShot.payload.doc.data()['img']
    //     }
    //   })
    // })


    // this.service.listenForMessagesChanges().subscribe(data => {
    //   this.service.AllChatMessages = data.map( snapShot => {
    
    // console.log(this.service.AllChatMessages);
        
    //     return {
    //       from: snapShot.payload.doc.data()['from'],
    //       to: snapShot.payload.doc.data()['to'],
    //       message: snapShot.payload.doc.data()['message'],
    //       time: snapShot.payload.doc.data()['time']
    //     }
    //   })
    // })

  }
 
  ngAfterViewInit() {
    // this.userli.nativeElement.children[0].classList.add("active");
  }

}