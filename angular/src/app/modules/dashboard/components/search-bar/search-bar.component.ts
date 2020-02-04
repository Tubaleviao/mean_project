import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  placeholder = "SearchBar";
  isSearching: boolean = false;
  value: string = "";
  constructor() {}

  ngOnInit() {}

  initiateSearch() {
    this.isSearching = true;
  }

  stopSeach() {
    this.isSearching = false;
    this.value = "";
  }
}
