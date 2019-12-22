import { Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  @ViewChild('userli', { static: false }) userli: ElementRef;

  usersList: any;

  loginedUser: any;

  constructor(private service: SendUserDetailsService) {
  }

  oldi: number = 0;

  sendClickedUserData(userId: any, i: number) {

    this.userli.nativeElement.children[this.oldi].classList.remove("active");

    this.userli.nativeElement.children[i].classList.add("active");

    this.service.setUserId(userId);

    this.oldi = i;

  }

  searchedName: any;

  get searchedResult() {
    if (this.searchedName) {
      var x = this.service.usersListResult(this.searchedName);
      return x;
    } else {
      var y = this.loginedUser;
      return this.service.usersList.filter(function (item) {
        return item.id !== y.id;
      });

    }
  }

  list: any;

  ngOnInit() {

    // this.usersList = this.service.usersList;

    this.loginedUser = this.service.loginedUser;

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

    this.service.listenForUsersChanges().subscribe(data => {
      this.service.usersList = data.map(snapShot => {
        return {
          id: +snapShot.payload.doc.id,
          password: snapShot.payload.doc.data()['password'],
          name: snapShot.payload.doc.data()['name'],
          state: snapShot.payload.doc.data()['state'],
          img: snapShot.payload.doc.data()['img']
        }
      })
    })

    // console.log(this.service.getUsers());
  }


  ngAfterViewInit() {

    this.userli.nativeElement.children[0].classList.add("active");

  }

}