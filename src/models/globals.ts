import { Injectable } from '@angular/core';
import { Globals } from '../models/globals'

@Injectable()
export class Globals {
  readonly API_BASENAME:string = 'https://edmonumolu.me:4001';
  readonly API_LOGIN = "https://edmonumolu.me:4001/users/login/"
  readonly API_REGISTER = "https://edmonumolu.me:4001/users"
}
