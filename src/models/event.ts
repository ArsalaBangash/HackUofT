export class Event {
	constructor(
		public _id: string,
		public name: string,
		public city: string,
		public country: string,
		public address: string,
		public start: Date,
		public end: Date,
		public picture: string,
		public links: string[],
		public type: string,
		public description: string,
    ) { }
}
