import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LocationService } from "./services/location";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [DashboardComponent, SearchBarComponent],
  providers: [LocationService],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    PipesModule
  ]
})
export class DashboardModule {}
