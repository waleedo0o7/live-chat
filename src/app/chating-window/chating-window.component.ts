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
    localStorage.clear();
    this.awayPersonData = this.service.awayuser;
    let loginName = 'username';
    let loginPassword = 'Password';
    let loginedUser = this.service.loginedUser;
    localStorage.setItem(loginName, JSON.stringify(loginedUser.name));
    localStorage.setItem(loginPassword, JSON.stringify(loginedUser.password));
    this.homePersonData = loginedUser;
  }
}