import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SendUserDetailsService {
  
  serviceData: string;

  usersList = [
    { id:1, name:"Khalid",state:"online",img:"../assets/01.jpg" },
    { id:2, name:"Taherah Big",state:"offline",img:"../assets/03.jpg" },
    { id:3, name:"Sami Rafi",state:"online",img:"../assets/02.jpg" },
    { id:4, name:"Nargis Hawa",state:"online",img:"../assets/04.jpg" },
    { id:5, name:"Rashid Samim",state:"offline",img:"../assets/05.jpg" },
    { id:100, name:"waleed",state:"online",img:"../assets/010.jpg" }
  ];

  AllChatMessages = [
    {from:1,to:100,message:'Hi waleed , how are you',time:"8:55 AM , Today"},
    {from:100,to:1,message:'Hi Khalid i am good tnx how about you?',time:"8:56 AM , Today"},
    {from:1,to:100,message:'I am good too, thank you for your chat template',time:"8:57 AM , Today"},
    {from:100,to:1,message:'You are welcome',time:"8:59 AM , Today"},
    {from:1,to:100,message:'I am looking for your next templates',time:"9:00 AM , Today"},
    {from:100,to:1,message:'Ok, thank you have a good day',time:"9:01 AM , Today"},
    {from:1,to:100,message:'Bye, see you',time:"9:05 AM , Today"},
    
    {from:1,to:3,message:'Bye, see you',time:"9:05 AM , Today"},
    {from:1,to:3,message:'Bye, see you',time:"9:05 AM , Today"},

    {from:2,to:100,message:'Hi, dddd how are you i am ID 2',time:"8:55 AM , Today"},
    {from:100,to:2,message:'Hi aaaaaa i am good tnx how about you?',time:"8:56 AM , Today"},
    {from:2,to:100,message:'I am good too, thank you for your chat template',time:"8:57 AM , Today"},
    {from:100,to:2,message:'You are welcome',time:"8:59 AM , Today"},

    {from:1,to:5,message:'Bye, see you',time:"9:05 AM , Today"},
    {from:1,to:5,message:'Bye, see you',time:"9:05 AM , Today"},

    {from:3,to:100,message:'Hi, how are you i am ID 3',time:"8:55 AM , Today"},
    {from:100,to:3,message:'Hi aaaaaaaa i am good tnx how about you?',time:"8:56 AM , Today"},
    {from:3,to:100,message:'I am good too, thank you for your chat template',time:"8:57 AM , Today"},
    {from:100,to:3,message:'You are welcome',time:"8:59 AM , Today"},

    {from:4,to:100,message:'Hi, how are youi am ID 4',time:"8:55 AM , Today"},
    {from:100,to:4,message:'Hi Khalid i am good tnx how about you?',time:"8:56 AM , Today"},
    {from:4,to:100,message:'I am good too, thank you for your chat template',time:"8:57 AM , Today"},
    {from:100,to:4,message:'You are welcome',time:"8:59 AM , Today"},
  ];

  // this is away user [0] to appare in the first time open chat window
  awayuser: any = this.usersList[0];

  getMessages(homeUser:any , awayUser:any ){
    homeUser =  this.usersList[5].id;
    awayUser =  this.awayuser.id;
    return this.AllChatMessages.filter(function(msg){
      return msg.from == homeUser && msg.to == awayUser || msg.to == homeUser  && msg.from == awayUser ;
    })
  }

  usersListResult(searchedName){
    var searchedNameLC = searchedName.toLowerCase()

    return this.usersList.filter(function(oneUser:any){
      return oneUser.name.toLowerCase().includes(searchedNameLC) && oneUser.id !== 100 ;
    })
  }

  setUserId(user){ 
    this.awayuser = user; 
  }

  constructor() { }
}