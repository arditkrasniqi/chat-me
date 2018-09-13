import User from './User';
export default class Message {
  user: User;
  message: string;

  constructor(message: string, user: User) {
    this.user = user;
    this.message = message;
  }
}
