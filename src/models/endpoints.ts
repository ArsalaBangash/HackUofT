/**
 * This class will contain all the endpoints for our API calls. The names of the
 * constants define the route for the endpoint
 */
export class Endpoints {
  readonly API_BASENAME = 'https://edmondumolu.me:4001';
  readonly API_LOGIN = "https://edmondumolu.me:4001/users/login/";
  readonly API_REGISTER = "https://edmondumolu.me:4001/users";
  readonly API_GET_EVENTS = "https://edmondumolu.me:4001/events";
  readonly API_GET_USER_EVENTS = "https://edmondumolu.me:4001/users/events";
}
