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
import { AskService } from "src/app/services/ask.service";
import { Router } from '@angular/router'

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  lat = 40.73061;
  lng = -73.935242;

  constructor(
    private ask: AskService,
    private _r2: Renderer2,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    let script = this._r2.createElement("script");
    // script.type = `text/javascript`;
    script.async = true;
    script.defer = true;
    script.src = this.ask.getMapScriptPath();
    script.addEventListener("load", () => {
      const coordinates = new google.maps.LatLng(this.lat, this.lng);
      console.log("COORDS", coordinates.toJSON());
      // alert("JJJJ");
    });

    this._r2.appendChild(this._document.body, script);
  }

  logout(){
    this.ask.logout()
    this.router.navigate(["/login"])
  }
}
