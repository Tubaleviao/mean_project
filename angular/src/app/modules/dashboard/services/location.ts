import { Injectable } from "@angular/core";
import { AskService } from "src/app/services/ask.service";
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { SocketService } from 'src/app/services/socket.service'

interface Coordinate {
  lat: number;
  lng: number;
}

@Injectable()
export class LocationService {
  constructor(private ask: AskService, private socket: SocketService) {}
  async getCurrent(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          const obj = { lng: resp.coords.longitude, lat: resp.coords.latitude }
          this.socket.sendMessage(obj)
          resolve(obj);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  trackLocation(): Observable<Coordinate> {
    return Observable.create(observer => {
      const intervalID = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          resp => {
            observer.next({
              lng: resp.coords.longitude,
              lat: resp.coords.latitude
            });
          },
          error => {
            clearInterval(intervalID);
            observer.error(error);
            observer.complete();
          }
        );
      }, 30000);
    }).pipe(
      distinctUntilChanged(
        (prev: Coordinate, curr: Coordinate) =>
          prev.lat === curr.lat && 
          prev.lng === curr.lng
      ),
      map(obj => {
        this.socket.sendMessage(obj)
        return obj
      })
    );
  }
}
