import User from './User';
export default class Message {
  public user: User;
  public message: string;
  private time: Date;

  constructor(message: string, user: User, time: Date) {
    this.user = user;
    this.message = message;
    this.time = time;
  }

  getTime() {
    // const date = new Date(this.time).toDateString();
    const time = new Date(this.time).toTimeString();
    // return date + ' ' + time.split(' ')[0];
    return time.split(' ')[0];
  }
}
