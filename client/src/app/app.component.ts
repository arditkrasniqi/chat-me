import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import Message from '../models/Message';
import User from '../models/User';
import { timer } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id: string;
  username: string;
  message: string;
  messages: Message[] = [];
  messagesDom: any;
  user: User;
  socket: any;

  ngOnInit() {
    this.id = this.generateId();
    this.socket = io.connect(environment.socket_connect);
    this.socket.on('chat', (data) => {
      this.messages.push(new Message(data.message, new User(data.id, data.username), new Date()));
      this.message = '';
      const timerSource = timer(500);
      timerSource.subscribe(() => {
        this.messagesDom.scrollTop = this.messagesDom.scrollHeight;
      });
    });
    this.fixMessagesHeight();
  }

  fixMessagesHeight() {
    document.addEventListener('DOMContentLoaded', () => {
      const msg = document.getElementById('sendMessageForm');
      this.messagesDom = document.getElementsByClassName('send-msg-form')[0];
      this.messagesDom.style.height = window.innerHeight - msg.offsetHeight + 'px';
      this.messagesDom.style.maxHeight = window.innerHeight - msg.offsetHeight + 'px';
    });
  }

  send() {
    if (this.message !== '') {
      this.socket.emit('chat', {
        username: this.username,
        message: this.message,
        id: this.id
      });
    }
  }

  chooseUsername(username) {
    if (username !== '') {
      this.username = username.value;
      this.user = new User(this.id, this.username);
    }
  }

  generateId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
