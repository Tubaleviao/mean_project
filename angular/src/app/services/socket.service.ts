import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket
  constructor() {
    this.socket = io("http://tuba.work:3000") // also change at ask service
   }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) =>{
      this.socket.on('new-message', m => observer.next(m))
    })
  }
}
