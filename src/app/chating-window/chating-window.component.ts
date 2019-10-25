import { Component, OnInit} from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'chating-window',
  templateUrl: './chating-window.component.html',
  styleUrls: ['./chating-window.component.scss']
})
export class ChatingWindowComponent implements OnInit {

  get getUser()
  {
    return this.service.awayuser;
  }

  get data()
  {
    return this.service.serviceData;
  }

  set data(value: string) {
    this.service.serviceData = value;
  }

  homePersonData:any;
  awayPersonData:any;
  
  txtareaVal:any="";

  confirmText(funval:string){

    this.service.AllChatMessages.push({
        from:this.homePersonData.id,
        to:this.getUser.id,
        message: funval,
        time:"9:15 AM , Today"
      });

      this.txtareaVal = "";

  }


  get chatMessages(){
    return this.service.getMessages(this.homePersonData,this.awayPersonData);
  };

  get messagesLength(){
    return this.chatMessages.length;
  }

  constructor(private service: SendUserDetailsService) {
    service.getMessages(this.homePersonData,this.awayPersonData);  
  }

  ngOnInit() {
    this.awayPersonData = this.service.awayuser;
    let loginKey = 'login information';
    let loginInfo = this.service.usersList[5];
    localStorage.setItem(loginKey, JSON.stringify(loginInfo));
    this.homePersonData = loginInfo;
  }
}