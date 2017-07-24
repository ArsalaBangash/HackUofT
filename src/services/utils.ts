import { UserInfo } from '../models/UserInfo2'
export class Utils{
  static findWithAttr(array: UserInfo[], attr: string, value: string): number{
		for(var i = 0; i < array.length; i += 1) {
				if(array[i][attr] === value) {
						return i;
				}
		}
		return -1;
	}
}
