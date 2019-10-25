import { Component, OnInit , NgModule} from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList:any;

  constructor(private service: SendUserDetailsService) {
  }

  sendClickedUserData(userId){
    debugger;
    this.service.setUserId(userId);
    debugger;
  }

  searchedName:any;

  get searchedResult(){
    if( this.searchedName ){
      var x = this.service.usersListResult(this.searchedName);
      return x ;
    } else {

      return this.service.usersList.filter(function(item){
        return item.id !== 100;
      });
      
    }
  }

  
  loginInfo:any;

  ngOnInit() {
    this.usersList = this.service.usersList;
    this.loginInfo = this.service.usersList[5];
  }

}