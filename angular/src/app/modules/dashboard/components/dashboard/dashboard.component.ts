import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Inject,
  OnInit
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
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
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  constructor(
    private locationService: LocationService,
    private storeService: StoreService,
    private _r2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.locationService.getCurrent().then(({ lat, lng }) => {
      this.lat = lat;
      this.lng = lng;
    });
    // let script = this._r2.createElement("script");
    // script.type = `text/javascript`;
    // script.async = true;
    // script.defer = true;
    // script.addEventListener("load", () => {
    //   const coordinates = new google.maps.LatLng(this.lat, this.lng);
    //   console.log("COORDS", coordinates.toJSON());
    //   // alert("JJJJ");
    // });
    // this._r2.appendChild(this._document.body, script);
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
