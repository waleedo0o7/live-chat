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
  }

  @ViewChild('msgBody', { static: false }) msgBody: ElementRef;

  scrollToBottom(msgBody: Element){
    setTimeout(() => {
      var elHegith = (msgBody.scrollHeight + 200 );
      msgBody.scrollTo(0, elHegith)
    }, 0);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}