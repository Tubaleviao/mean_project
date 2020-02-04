import { Injectable } from "@angular/core";
import { AskService } from "src/app/services/ask.service";
import { StoreService } from "src/app/services/store.service";
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { SocketService } from "src/app/services/socket.service";

interface Coordinate {
  lat: number;
  lng: number;
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Injectable()
export class LocationService {
  constructor(
    private ask: AskService,
    private socket: SocketService,
    private store: StoreService) { }
  async getCurrent(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          const obj = { lng: resp.coords.longitude, lat: resp.coords.latitude };
          console.log(this.store.getState())
          const holeObj = { username: this.store.getState().user.username, location: obj}
          this.socket.sendMessage(holeObj);
          resolve(obj);
        },
        err => {
          reject(err);
        },
        options
      );
    });
  }

  trackLocation(): Observable<Coordinate> {
    return Observable.create(observer => {
      const successHander = resp =>
        observer.next({
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        });

      navigator.geolocation.getCurrentPosition(successHander, error => {
        observer.error(error);
        observer.complete();
      }, options);

      const intervalID = setInterval(() => {
        navigator.geolocation.getCurrentPosition(successHander, error => {
          clearInterval(intervalID);
          observer.error(error);
          observer.complete();
        }, options);
      }, 30000);
    }).pipe(
      distinctUntilChanged(
        (prev: Coordinate, curr: Coordinate) =>
          prev.lat === curr.lat && prev.lng === curr.lng
      ),
      map(obj => {
        const holeObj = { username: this.store.getState().user.username, location: obj}
        this.socket.sendMessage(holeObj)
        return obj;
      })
    );
  }
}
