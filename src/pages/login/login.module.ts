import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LogRegService } from '../services/log_reg_service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    LogRegService],
  exports: [
    LoginPage,
  ]
})
export class LoginPageModule { }
