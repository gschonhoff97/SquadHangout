    // client/src/app/app.component.ts

    import { Component } from '@angular/core';
    import Chatkit from '@pusher/chatkit-client';
    import axios from 'axios';

    @Component({
      selector: 'app-chatroom',
      templateUrl: './chatroom.component.html',
      styleUrls: ['./chatroom.component.scss']
    })

    export class ChatroomComponent {
      title = 'Angular Chatroom';
      messages = [];
      users = [];
      currentUser: any;

      _username: string = '';
      get username(): string {
        return this._username;
      }
      set username(value: string) {
        this._username = value;
      }

      _message: string = '';
      get message(): string {
        return this._message;
      }
      set message(value: string) {
        this._message = value;
      }

      sendMessage() {
        const { message, currentUser } = this;
        currentUser.sendMessage({
          text: message,
          roomId: '19403511',
        });
        this.message = '';
      }

      addUser() {
        const { username } = this;
        axios.post('http://localhost:5200/users', { username })
          .then(() => {
            const tokenProvider = new Chatkit.TokenProvider({
              url: 'http://localhost:5200/authenticate'
            });

            const chatManager = new Chatkit.ChatManager({
              instanceLocator: 'v1:us1:ee77aa81-5b00-4acb-a620-a381748e3901',
              userId: username,
              tokenProvider
            });

            return chatManager
              .connect()
              .then(currentUser => {
                currentUser.subscribeToRoom({
                  roomId: '19403511',
                  messageLimit: 100,
                  hooks: {
                    onMessage: message => {
                      this.messages.push(message);
                    },
                    onPresenceChanged: (state, user) => {
                      this.users = currentUser.users.sort((a, b) => {
                        if (a.presence.state === 'online') return -1;

                        return 1;
                      });
                    },
                  },
                });

                this.currentUser = currentUser;
                this.users = currentUser.users;
              });
          })
            .catch(error => console.error(error))
      }
    }