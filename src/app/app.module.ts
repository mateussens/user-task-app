import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserModule} from "./user/user.module";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { TaskComponent } from './task/task.component';
import {TaskModule} from "./task/task.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToastrModule.forRoot(),

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    TaskModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
