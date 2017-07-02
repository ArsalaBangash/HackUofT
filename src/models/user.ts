export class User {
	constructor(
		public _id: string,
		public name: string,
		public email: string,
		public verified: boolean,
		public followers,
		public following) { }
}
