import { UserInfo } from '../models/UserInfo2'
export class User {
	constructor(
		public _id: string,
		public name: string,
		public avatar: string,
		public email: string,
		public verified: boolean,
		public followers: UserInfo[],
		public following: UserInfo[],
		public events: string[]) { }
}
