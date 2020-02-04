import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  placeholder = "SearchBar";
  isSearching: boolean = false;
  isPending: boolean = false;
  @Input("initialValue") searchKey: string = "";

  @Output("onSearch") onSearch = new EventEmitter<string>();

  list: string[] = []; // ["a", "b", "c"];

  private subscription: Subscription;

  @ViewChild("searchbar", { static: true }) searchElement: ElementRef;

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
    this.searchKey = "";
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent<any>(
      this.searchElement.nativeElement,
      "keyup"
    )
      .pipe(
        map(event => event.target.value),
        startWith(this.searchKey),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(criterion => {
        if (!!criterion) {
          this.isPending = true;
          console.log("SEARCH", criterion, this.searchKey);
          this.onSearch.emit(criterion);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
