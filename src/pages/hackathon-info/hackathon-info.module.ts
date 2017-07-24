import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HackathonInfoPage } from './hackathon-info';

@NgModule({
  declarations: [
    HackathonInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HackathonInfoPage),
  ],
  exports: [
    HackathonInfoPage
  ]
})
export class HackathonInfoPageModule { }
