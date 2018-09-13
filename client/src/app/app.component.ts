import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import Message from '../models/Message';
import User from '../models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  id: string;
  username: string;
  message: string;
  messages: Message[] = [];
  user: User;
  socket: any;

  ngOnInit() {
    this.id = this.generateId();
    this.socket = io.connect('http://localhost:9000');
    this.socket.on('chat', (data) => {
      this.messages.push(new Message(data.message, new User(data.id, data.username)));
      this.message = '';
    });
  }

  send() {
    this.socket.emit('chat', {
      username: this.username,
      message: this.message,
      id: this.id
    });
  }

  chooseUsername(username) {
    this.username = username.value;
    this.user = new User(this.id, this.username);
  }

  generateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
