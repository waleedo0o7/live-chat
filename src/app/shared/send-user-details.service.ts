import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class SendUserDetailsService {

  userFromLocalStorage = localStorage.getItem("loginedUser");
  userFromLocalStorageJson = JSON.parse(this.userFromLocalStorage);
  loginedUser: any = this.userFromLocalStorageJson;

  login(username, password) {

    try {

      this.loginedUser = this.usersList.find(item => item.name === username);

      if (this.loginedUser != undefined && username == this.loginedUser.name && password == "123") {
        localStorage.setItem("loginedUser", JSON.stringify(this.loginedUser));
        this.router.navigate(['main-chat']);


      } else {

        alert("username: waleed - password 123");

      }

    } catch (ex) {

      alert("username: waleed - password 123");

    }
  }



  addNewUser(username, password, userID) {

    alert("user " + username + " added ya man :) check cloud firebase ");

    this.firestore.collection("users").doc(userID).set({
      id: userID,
      name: username,
      password: password,
      state: "online",
      img: "../assets/new-user.svg"
    })
  }

  usersList =[
    { id: 1, password: "123", name: "Khalid", state: "online", img: "../assets/01.jpg" },
    { id: 2, password: "123", name: "Taherah Big", state: "offline", img: "../assets/03.jpg" },
    { id: 3, password: "123", name: "Sami Rafi", state: "online", img: "../assets/02.jpg" },
    { id: 4, password: "123", name: "Nargis Hawa", state: "online", img: "../assets/04.jpg" },
    { id: 5, password: "123", name: "Rashid Samim", state: "offline", img: "../assets/05.jpg" },
    { id: 100, password: "123", name: "waleed", state: "online", img: "../assets/010.jpg" }
  ];





  AllChatMessages = [
    { from: 1, to: 100, message: 'Hi waleed , how are you', time: "8:55 AM , Today" },
    { from: 100, to: 1, message: 'Hi Khalid i am good tnx how about you?', time: "8:56 AM , Today" },
    { from: 1, to: 100, message: 'I am good too, thank you for your chat template', time: "8:57 AM , Today" },
    { from: 100, to: 1, message: 'You are welcome', time: "8:59 AM , Today" },
    { from: 1, to: 100, message: 'I am looking for your next templates', time: "9:00 AM , Today" },
    { from: 100, to: 1, message: 'Ok, thank you have a good day', time: "9:01 AM , Today" },
    { from: 1, to: 100, message: 'Bye, see you', time: "9:05 AM , Today" },

    { from: 1, to: 3, message: 'hi, see you', time: "9:05 AM , Today" },
    { from: 3, to: 1, message: 'Bye, see you', time: "9:05 AM , Today" },
    { from: 1, to: 3, message: 'hi i am Khalid, see you', time: "9:05 AM , Today" },
    { from: 3, to: 1, message: 'hi i am Sami Rafi , see you', time: "9:05 AM , Today" },

    { from: 2, to: 100, message: 'Hi, dddd how are you i am ID 2', time: "8:55 AM , Today" },
    { from: 100, to: 2, message: 'Hi aaaaaa i am good tnx how about you?', time: "8:56 AM , Today" },
    { from: 2, to: 100, message: 'I am good too, thank you for your chat template', time: "8:57 AM , Today" },
    { from: 100, to: 2, message: 'You are welcome', time: "8:59 AM , Today" },

    { from: 1, to: 5, message: 'Bye, see you', time: "9:05 AM , Today" },
    { from: 1, to: 5, message: 'Bye, see you', time: "9:05 AM , Today" },

    { from: 3, to: 100, message: 'Hi, how are you i am ID 3', time: "8:55 AM , Today" },
    { from: 100, to: 3, message: 'Hi aaaaaaaa i am good tnx how about you?', time: "8:56 AM , Today" },
    { from: 3, to: 100, message: 'I am good too, thank you for your chat template', time: "8:57 AM , Today" },
    { from: 100, to: 3, message: 'You are welcome', time: "8:59 AM , Today" },

    { from: 4, to: 100, message: 'Hi, how are youi am ID 4', time: "8:55 AM , Today" },
    { from: 100, to: 4, message: 'Hi Khalid i am good tnx how about you?', time: "8:56 AM , Today" },
    { from: 4, to: 100, message: 'I am good too, thank you for your chat template', time: "8:57 AM , Today" },
    { from: 100, to: 4, message: 'You are welcome', time: "8:59 AM , Today" },
  ];

  // this is away user [0] to appare in the first time open chat window
  awayuser: any = this.usersList[0];

  getMessages(homeUser: any, awayUser: any) {
    homeUser = this.loginedUser.id;
    awayUser = this.awayuser.id;
    return this.AllChatMessages.filter(function (msg) {
      return msg.from == homeUser && msg.to == awayUser || msg.to == homeUser && msg.from == awayUser;
    })
  }

  usersListResult(searchedName) {
    var searchedNameLC = searchedName.toLowerCase();
    var y = this.loginedUser;
    return this.usersList.filter(function (oneUser: any) {
      return oneUser.name.toLowerCase().includes(searchedNameLC) && oneUser.id !== y.id;
    })
  }

  setUserId(user) {
    this.awayuser = user;
  }

  getUsers() {
    return this.firestore.collection('users').get()
  }

  listenForUsersChanges() {
    return this.firestore.collection('users').snapshotChanges()
  }

  constructor(private router: Router,
    private firestore: AngularFirestore
  ) { }
}