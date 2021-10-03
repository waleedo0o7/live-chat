import { ViewChild, ElementRef, Component} from '@angular/core';
import { Injectable , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    constructor(private http:HttpClient , public router: Router, private firestore: AngularFirestore , public afs: AngularFirestore, public afAuth: AngularFireAuth,public ngZone: NgZone) {}

    chatMessagesList:any = [];

    usersList = [] ;

    mainLoginedUserData: any; // Save logged in user data

    loginedUserData:any = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
      state: '',
    };

    awayUserData:any;
    txtareaVal:any;
    limit:any = 2;

    scrollToBottom(msgBody: Element){
      setTimeout(() => {
        var elHegith = (msgBody.scrollHeight + 200 );
        msgBody.scrollTo(0, elHegith)
      }, 0);
    }


    onClickGetUserData(awayUser) {
      this.awayUserData = awayUser;
      console.log(this.loginedUserData);
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
          console.log('result.user');
          console.log(result.user);
          
          // this.SetUserData(result.user);
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

          window.alert(`${result.user.email} Added Succesfuly`)
          this.router.navigate(['login']);
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
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        state: 'offline'
      }
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

      this.usersList = [];

      let items = this.firestore.collection('users').get().subscribe(documentsSnapshot => {
        let item = documentsSnapshot.docs.map(document => {
          
          
          let dName:any;
          if( document.data()['displayName'] ) {
            dName = document.data()['displayName']
          } else {
            dName = 'Default Name'
          }

          let imgURL:any;
          if( document.data()['photoURL']  ) {
            imgURL = document.data()['photoURL']
          } else {
            imgURL = 'http://chat.waleedsa3ed.com/assets/new-user.svg'
          }

          if (document.data()['uid']  != this.loginedUserData.uid) {
            this.usersList.push({
              uid : document.data()['uid'] ,
              photoURL : imgURL,
              displayName : dName,
              email : document.data()['email'],
              state : document.data()['state']
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

      let roomName:any;

      if ( from > to ) {
        roomName = `${from}-${to}`
      } else {
        roomName = `${to}-${from}`
      }

      let messagesRef = this.firestore.collection('messages').doc('messagesDoc').collection(`${roomName}`, ref => ref.orderBy('time','asc'));

      messagesRef.valueChanges().subscribe(docs => {
        console.log(docs);
        this.chatMessagesList = [];
        docs.map(document => {
          console.log(document);
          
            this.chatMessagesList.push({
              from : document['from'] ,
              message : document['message'],
              time : this.convertTimestampToDate(document['time'].toDate()) ,
              to : document['to']
            });
          })        
      })

      // messagesRef.get().subscribe(documentsSnapshot => {
      //     let test = documentsSnapshot.docs.map(document => {
      //     this.chatMessagesList.push({
      //       from : document.data()['from'] ,
      //       message : document.data()['message'],
      //       time : this.convertTimestampToDate(document.data()['time'].toDate()) ,
      //       to : document.data()['to']
      //     });
      //   })        
      // })

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

      let roomName:any ;

      if ( from > to ) {
        roomName = `${from}-${to}`
      } else {
        roomName = `${to}-${from}`
      }

      this.firestore.collection('messages').doc('messagesDoc').collection(roomName).add({
        from: `${from}`,
        to: `${to}`,
        message: message ,
        time: this.stampServerTime()
      });

      this.txtareaVal = '';

      // this.chatMessagesList.push ({
      //   from: `${from}`,
      //   to: `${to}`,
      //   message: message ,
      //   time:  this.convertTimestampToDate(this.stampServerTime().toDate()),
      // })


    }

}