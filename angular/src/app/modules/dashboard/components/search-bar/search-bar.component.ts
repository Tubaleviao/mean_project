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
import { AskService } from "src/app/services/ask.service";

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

  list: any[] = [];

  private subscription: Subscription;

  @ViewChild("searchbar", { static: true }) searchElement: ElementRef;

  constructor(private ask: AskService) {}

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
    this.list = [];
  }

  addFriend(friend) {
    const index = this.list.indexOf(friend);
    this.list[index] = { ...friend, isPending: true };
    const subscription = this.ask.addFriend(friend).subscribe(
      isFriend => {
        this.list[index] = { ...this.list[index], isFriend };
      },
      console.error,
      () => {
        this.list[index] = { ...this.list[index], isPending: false };
        subscription.unsubscribe();
      }
    );
    console.log("ADD FRIEND", friend);
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
      .subscribe(criteria => {
        if (!!criteria) {
          this.isPending = true;
          this.list = [];

          const subs = this.ask.searchUsers(criteria).subscribe(
            users => {
              this.list = users;
            },
            err => {
              console.log(err);
              this.isPending = false;
            },
            () => {
              this.isPending = false;
              subs.unsubscribe();
            }
          );
        } else {
          this.list = [];
          this.isPending = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
