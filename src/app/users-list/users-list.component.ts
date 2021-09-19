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

  @ViewChild('allUsers' , { static : false }) allUsers : ElementRef;

  addActiveClass(awayUser){
    
    let usersElements = this.allUsers.nativeElement.children;

    for (let i = 0; i < usersElements.length; i++) {
      usersElements[i].classList.remove('active');
    }

    awayUser.classList.add('active')

  }

  searchedUsersList = [];
  searchedName: any;

  usersListResult(searchedName:any) {
    let searchedNameLC = searchedName.toLowerCase(); 
    this.searchedUsersList = this.service.usersList.filter(function (oneUser: any) {
      return oneUser.displayName.toLowerCase().includes(searchedNameLC);
    })
  }



  ngOnInit() {

    setTimeout(() => {
      this.service.getUsersFromFirebase();
      this.searchedUsersList = this.service.usersList
    }, 1000);

  }
 
  ngAfterViewInit() {
  }

}