import { UserInfo } from '../models/UserInfo2'
export class Event {
	constructor(
		public _id: string,
		public name: string,
		public city: string,
		public country: string,
		public address: string,
		public start: string,
		public end: string,
		public picture: string,
		public links: string[],
		public type: string,
		public description: string,
		public usersGoing: UserInfo[]
    ) {
	}

}
