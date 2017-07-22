import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfo } from '../models/UserInfo2'
export class User {
	constructor(
		public userInfo: UserInfo,
		public email: string,
		public verified: boolean,
		public followers: UserInfo[],
		public following: UserInfo[],
		public events: string[]) { }
}
