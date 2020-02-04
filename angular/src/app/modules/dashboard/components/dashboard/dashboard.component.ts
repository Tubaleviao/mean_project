import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { LocationService } from "../../services/location";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 41.017288;
  lng = -91.9671737;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  constructor(
    private locationService: LocationService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    const subscriptor = this.locationService.trackLocation().subscribe(
      ({ lat, lng }) => {
        console.log("HEY")
        this.lat = lat;
        this.lng = lng;
      },
      console.error,
      () => subscriptor.unsubscribe()
    );
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  logout() {
    this.storeService.logout();
  }
}
