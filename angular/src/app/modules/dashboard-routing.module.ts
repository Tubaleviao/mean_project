import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { AuthenticatedGuard } from "src/app/guards/authenticated.guard";

const routes: Routes = [
  {
    path: "dashboard",
    pathMatch: "full",
    component: DashboardComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

