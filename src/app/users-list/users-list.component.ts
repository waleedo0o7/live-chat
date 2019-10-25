import { Component, OnInit , NgModule} from '@angular/core';
import { SendUserDetailsService } from '../shared/send-user-details.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  get data():string {
      return this.service.serviceData;
  }
  set data(value: string) {
      this.service.serviceData = value;
  }

  usersList:any;

  constructor(private service: SendUserDetailsService) {
  }

  sendClickedUserData(userId){
    this.service.setUserId(userId);
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

  ngOnInit() {
    this.usersList = this.service.usersList;
  }

}