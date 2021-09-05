import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChatingWindowComponent } from './chating-window/chating-window.component';
import { SendUserDetailsService } from './shared/send-user-details.service';
import { FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login/login.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { AddUserComponent } from './add-user/add-user.component'; 

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Firebase modules 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HttpClientModule } from "@angular/common/http";

// Hash Links
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ChatingWindowComponent,
    LoginComponent,
    AddUserComponent,
    MainChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    HttpClientModule,
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireModule.initializeApp(environment.firebase),
  ], 
  providers: [SendUserDetailsService , { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
