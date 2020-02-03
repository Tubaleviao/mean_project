import { Injectable } from "@angular/core";
import { AskService } from "src/app/services/ask.service";

@Injectable()
export class LocationService {
  constructor(private ask: AskService) {}
  getCurrent() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          console.log("ERROR, not allowed");
          reject(err);
        }
      );
    });
  }
}
