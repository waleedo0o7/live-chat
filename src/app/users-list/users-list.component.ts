import { Component, OnInit , NgModule} from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList:any;
  loginedUser:any;

  constructor(private service: SendUserDetailsService) {
  }

  sendClickedUserData(userId){
    debugger;
    this.service.setUserId(userId);
    debugger;
  }

  searchedName:any;

  get searchedResult(){debugger;
    if( this.searchedName ){
      var x = this.service.usersListResult(this.searchedName);
      return x ;
    } else {debugger;
      var y = this.loginedUser;
      return this.service.usersList.filter(function(item){
        return item.id !== y.id;
      });
      
    }
  }


  ngOnInit() {
    debugger;
    this.usersList = this.service.usersList;
    debugger;
    this.loginedUser = this.service.loginedUser;
    debugger;
  }

}