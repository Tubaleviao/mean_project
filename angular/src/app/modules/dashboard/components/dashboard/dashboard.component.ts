import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  GOOGLE_API_KEY: string = "AIzaSyC1_174lsuQyXXqp83sKBuyuCnP2c0hAsQ";
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  lat = 40.73061;
  lng = -73.935242;

  // coordinates = new google.maps.LatLng(this.lat, this.lng);

  constructor(
    private _r2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    let script = this._r2.createElement("script");
    //<script async defer src="https://maps.googleapis.com/maps/api/js?key={{GOOGLE_API_KEY}}&callback=initMap" type="text/javascript"></script>
    script.type = `text/javascript`;
    // script.async = true;
    // script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_API_KEY}`; //&callback=initMap
    // script.text = `
    //         {
    //             "@context": "https://schema.org"
    //             /* your schema.org microdata goes here */
    //         }
    //     `;

    this._r2.appendChild(this._document.body, script);
  }
}
