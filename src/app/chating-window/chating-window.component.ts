import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'chating-window',
  templateUrl: './chating-window.component.html',
  styleUrls: ['./chating-window.component.scss']
})
export class ChatingWindowComponent implements OnInit {

  constructor(private service: SendUserDetailsService , private firestore: AngularFirestore) {
    // service.getMessages(this.homePersonData,this.awayPersonData);
  }

  // @ViewChild('messagesBody', { static: false }) messagesBody: ElementRef;

  // get getUser()
  // {
  //   return this.service.awayuser;
  // }

  txtareaVal:any="";

  // scrollToBottom(el: Element){
  //   var elHegith = (el.scrollHeight + 200 );
  //   el.scrollTo(0, elHegith)
  // }


  // confirmText(funval:string){
  //     if (funval){
  //       // this.service.AllChatMessages.push({
  //       //   from:this.homePersonData.id,
  //       //   to:this.getUser.id,
  //       //   message: funval,
  //       //   time: this.stampTime()
  //       // });
  //       this.firestore.collection("messages").add({
  //         from:this.homePersonData.id,
  //         to:this.getUser.id,
  //         message: funval,
  //         time: this.stampTime()
  //       });
  //       this.txtareaVal = "";
  //       setTimeout(() => {
  //         var messagesBodyVar = this.messagesBody.nativeElement;
  //         this.scrollToBottom(messagesBodyVar);        
  //       }, 1);
  //     }
  // }


  // get chatMessages(){
  //   return this.service.getMessages(this.homePersonData,this.awayPersonData);
  // };

  // get messagesLength(){
  //   return this.chatMessages.length;
  // }

  // stampTime(){
  //   var currentDate = new Date();
  //   var minutes = currentDate.getMinutes();
  //   var hours = currentDate.getHours()
  //   var timeString = hours + ":" + minutes;
  //   return timeString;
  // }

  ngOnInit() {

    // this.firestore.collection("messages").add({
    //   from:this.homePersonData.id,
    //   to: 2 ,
    //   message: 'hi',
    //   time: this.service.stampTime()
    // });

    // alert('sssss');

    // this.awayPersonData = this.service.awayuser;
    // console.log(messagesBodyVar);
    // let loginName = 'username';
    // let loginPassword = 'Password';
    // this.homePersonData = localStorage.getItem("loginedUser");
    // let loginedUser = this.service.loginedUser;
    // localStorage.setItem(loginName, JSON.stringify(loginedUser.name));
    // localStorage.setItem(loginPassword, JSON.stringify(loginedUser.password));
    // this.homePersonData = loginedUser;
  }


  ngAfterViewInit() {
    // var messagesBodyVar = this.messagesBody.nativeElement;
    // this.scrollToBottom(messagesBodyVar);
  }

}