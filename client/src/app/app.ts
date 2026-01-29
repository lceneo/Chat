import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, httpResource} from '@angular/common/http';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');

  httpClient = inject(HttpClient);

  // sd = httpResource(() => '/api/users');

  socket = io('/chat', { withCredentials: true });
  constructor() {
    // httpResource((ds) => ds.)
    this.httpClient.post('/api/auth/sign-in', { userId: '60438fb4-9ec8-4e0d-9aae-1392fd8eb9cc' }).subscribe()
    this.socket.on('connect', () => {
      setTimeout(() => {
        this.socket.emit('chat', 'test', (res: any) => {
          console.log(res);
        });
      }, 5000)
    })
  }
}