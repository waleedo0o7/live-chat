import { Injectable , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  state?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SendUserDetailsService {

    constructor(private http:HttpClient , public router: Router, private firestore: AngularFirestore , public afs: AngularFirestore, public afAuth: AngularFireAuth,public ngZone: NgZone) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.mainLoginedUserData = user;

            localStorage.setItem('user', JSON.stringify(this.mainLoginedUserData));
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
        })
        this.loginedUserData  =  JSON.parse(localStorage.getItem('user'));
    }

    usersList:any = [];

    chatMessagesList:any = [];

    mainLoginedUserData: any; // Save logged in user data

    loginedUserData:any;

    awayUserData:User;

    txtareaVal:any;

    onClickGetUserData(awayUser) {
      this.awayUserData = awayUser;
    }

    stampServerTime(){
      return firebase.firestore.Timestamp.now();
    }

    // Sign in with email/password
    SignIn(email?:string, password?:string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            setTimeout(() => {
              this.loginedUserData  =  JSON.parse(localStorage.getItem('user'))
              this.router.navigate(['main-chat']);              
            }, 600);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    // Sign up with email/password
    SignUp(email, password) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user:User) { 
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL ,
        emailVerified: user.emailVerified,
        state: 'offline'
      }
      console.log('SetUserData user');    
      console.log(user);      
      return userRef.set(userData, {
        merge: true
      })
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
    }

    // Sign out 
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    }

    getUsersFromFirebase() {
      let items = this.firestore.collection('users').get().subscribe(documentsSnapshot => {
        let item = documentsSnapshot.docs.map(document => {
          let dName:any;
          if( document.data()['displayName'] ) {
            dName = document.data()['displayName']
          } else {
            dName = 'Default Name'
          }

          if ( document.data()['uid']  !== this.loginedUserData.uid) {

            this.usersList.push({
              uid : document.data()['uid'] ,
              photoURL : document.data()['photoURL'],
              displayName : dName,
              email : document.data()['email'],
              state : document.data()['state'],
              isActive : false
            })
          }
        })
      })


    }

    convertTimestampToDate(dateFromFirebase){
      let seconds = dateFromFirebase.getSeconds()
      let minutes = dateFromFirebase.getMinutes();
      let hours = dateFromFirebase.getHours();
      let day = dateFromFirebase.getDate();
      let month = dateFromFirebase.getMonth();
      let year = dateFromFirebase.getFullYear();

      let finalFirebaseDate = `${day}/${month+ 1}/${year} ${hours}:${minutes}:${seconds}`;

      // let nowDate = new Date();
      // let nowSeconds = nowDate.getSeconds()
      // let nowMinutes = nowDate.getMinutes();
      // let nowHours = nowDate.getHours();
      // let nowDay = nowDate.getDate();
      // let nowMonth = nowDate.getMonth();
      // let nowYear = nowDate.getFullYear();
      // let finalNowDate = `${nowDay}/${nowMonth+ 1}/${nowYear} ${nowHours}:${nowMinutes}:${nowSeconds}`;

      return finalFirebaseDate;
    }

    getMessagesFromFirebase( from:any , to:any) {
      
      this.chatMessagesList = [];
      let roomName:any ;

      if ( from > to ) {
        roomName = `${from}-${to}`
      } else {
        roomName = `${to}-${from}`
      }

      let messagesRef = this.firestore.collection(`${roomName}`, ref => ref.orderBy('time','asc'))
      .get().subscribe(documentsSnapshot => {
            let test = documentsSnapshot.docs.map(document => {
            this.chatMessagesList.push({
              from : document.data()['from'] ,
              message : document.data()['message'] ,
              time : this.convertTimestampToDate(document.data()['time'].toDate()) ,
              to : document.data()['to']
            })        
          })
        })
        console.log('chatMessagesList');
        console.log(this.chatMessagesList);
    }

    updateCurrentUser(){
      return new Promise<any>((resolve, reject) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: 'Waleed Valencia',
          photoURL : 'http://chat.waleedsa3ed.com/assets/010.jpg'
        }).then(res => {
          resolve(res);
        }, err => reject(err))
      })
    }

    sendMessageToFirebase(from:any , to:any , message:any ){
      

      // alert(from + to +  message )

      let roomName:any ;


      if ( from > to ) {
        roomName = `${from}-${to}`
      } else {
        roomName = `${to}-${from}`
      }

      this.firestore.collection(roomName).add({
        from: `${from}`,
        to: `${to}`,
        message: message ,
        time: this.stampServerTime()
      });

      this.getMessagesFromFirebase(`${from}` , `${to}`)
    }
}