import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LocationService } from "./services/location";
import { AngularMaterialModule } from "src/app/angular-material.module";

@NgModule({
  declarations: [DashboardComponent],
  providers: [LocationService],
  imports: [CommonModule, DashboardRoutingModule, AngularMaterialModule]
})
export class DashboardModule {}
