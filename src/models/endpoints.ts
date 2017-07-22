/**
 * This class will contain all the endpoints for our API calls. The names of the
 * constants define the route for the endpoint
 */
export class Endpoints {
  readonly API_BASENAME = 'https://edmondumolu.me:4001';
  readonly API_LOGIN = this.API_BASENAME + "/users/login/";
  readonly API_REGISTER = this.API_BASENAME + "/users";
  readonly API_UPDATE_USER = this.API_BASENAME + "/users";
  readonly API_POST_USER_EVENT = this.API_BASENAME +"/users/events/add";
  readonly API_GET_USER_BY_ID = this.API_BASENAME + "/users/find";
  readonly API_GET_USER_EVENTS = this.API_BASENAME + "/users/events";
  readonly API_USER_FOLLOWING =  this.API_BASENAME + "/users/following/add";
  readonly API_USER_FOLLOWER = this.API_BASENAME + "/users/followers/add";
  readonly API_GET_USER_FOLLOWING =  this.API_BASENAME + "/users/following";
  readonly API_GET_USER_FOLLOWER = this.API_BASENAME + "/users/followers";
  readonly API_DELETE_USER_FOLLOWING =  this.API_BASENAME + "/users/following/delete";
  readonly API_DELETE_USER_FOLLOWER =  this.API_BASENAME+ "/users/followers/delete";
  readonly API_GET_EVENTS = this.API_BASENAME + "/events";
  readonly API_ADD_EVENT_USERS = this.API_BASENAME + "/events/users/add";
  readonly API_REMOVE_EVENT_USERS = this.API_BASENAME + "/events/users/delete";
  // comeback to make sure
  readonly API_GET_EVENT_BY_ID = this.API_BASENAME +"/events/id";
}
