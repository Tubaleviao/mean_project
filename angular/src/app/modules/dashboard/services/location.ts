import { Injectable } from "@angular/core";
import { AskService } from "src/app/services/ask.service";
import { Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

interface Coordinate {
  lat: number;
  lng: number;
}

@Injectable()
export class LocationService {
  constructor(private ask: AskService) {}
  async getCurrent(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
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
          prev.lat === curr.lat && prev.lng === curr.lng
      )
    );
  }
}
