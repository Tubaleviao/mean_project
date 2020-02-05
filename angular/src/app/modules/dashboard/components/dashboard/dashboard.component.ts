import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { LocationService } from "../../services/location";
import { AskService } from "src/app/services/ask.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = -23.5577311;
  lng = -46.6485777;

  constructor(
    private ask: AskService,
    private locationService: LocationService,
    private storeService: StoreService
  ) {}

  processFriends(friends) {
    //   if (location) {
    //     const { lat, lng } = location;
    //     const coordinates = new google.maps.LatLng(lat, lng);
    //     const newMarker = new google.maps.Marker({
    //       position: coordinates,
    //       map: this.map
    //     });
    //     newMarker.setMap(this.map);
    //   }
    // });
  }

  ngOnInit() {
    const askSubscription = this.ask
      .loadFriends()
      .subscribe(this.processFriends, console.error, () =>
        askSubscription.unsubscribe()
      );
    const subscriptor = this.locationService.trackLocation().subscribe(
      ({ lat, lng }) => {
        const coordinates = new google.maps.LatLng(lat, lng);

        this.map.setCenter(coordinates);

        const newMarker = new google.maps.Marker({
          position: coordinates,
          map: this.map
        });

        newMarker.setMap(this.map);
      },
      console.error,
      () => subscriptor.unsubscribe()
    );
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    const coordinates = new google.maps.LatLng(this.lat, this.lng);

    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 15
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map
    });
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  logout() {
    this.storeService.logout();
  }
}
