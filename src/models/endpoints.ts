/**
 * This class will contain all the endpoints for our API calls. The names of the
 * constants define the route for the endpoint
 */
export class Endpoints {
  readonly API_BASENAME = 'https://edmondumolu.me:4001';
  readonly API_LOGIN = "https://edmondumolu.me:4001/users/login/";
  readonly API_REGISTER = "https://edmondumolu.me:4001/users";

  readonly API_POST_USER_EVENT = "https://edmondumolu.me:4001/users/events/add";

  // I have a question here 
  readonly API_GET_USER_BY_ID = "https://edmondumolu.me:4001/users/find";
  readonly API_GET_USER_EVENTS = "https://edmondumolu.me:4001/users/events";
  readonly API_USER_FOLLOWING =  "https://edmondumolu.me:4001/users/following/add";
  readonly API_USER_FOLLOWER = "https://edmondumolu.me:4001/users/followers/add";
  readonly API_GET_USER_FOLLOWING =  "https://edmondumolu.me:4001/users/following";
  readonly API_GET_USER_FOLLOWER = "https://edmondumolu.me:4001/users/followers";
  readonly API_DELETE_USER_FOLLOWING =  "https://edmondumolu.me:4001/users/following/delete";
  readonly API_DELETE_USER_FOLLOWER =  "https://edmondumolu.me:4001/users/followers/delete";
  readonly API_GET_EVENTS = "https://edmondumolu.me:4001/events";


  // comeback to make sure
  readonly API_GET_EVENT_BY_ID = "https://edmondumolu.me:4001/events/id";
}
