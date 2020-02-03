import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LocationService } from "./services/location";

@NgModule({
  declarations: [DashboardComponent],
  providers: [LocationService],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
