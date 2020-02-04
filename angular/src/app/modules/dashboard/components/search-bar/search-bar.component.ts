import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  placeholder = "SearchBar";
  isSearching: boolean = false;
  value: string = "";

  list: string[] = []// ["a", "b", "c"];

  @ViewChild("searchbar", { static: true }) searchElement;

  constructor() {}

  ngOnInit() {}

  initiateSearch() {
    this.isSearching = true;
    setTimeout(() => {
      // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    }, 0);
  }

  stopSeach() {
    this.isSearching = false;
    this.value = "";
  }
}
