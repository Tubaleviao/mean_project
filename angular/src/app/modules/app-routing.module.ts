import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "../components/sign-in/sign-in.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { NotAuthenticatedGuard } from "src/app/guards/notauthenticated.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "login", component: SignInComponent, canActivate: [NotAuthenticatedGuard] },
  { path: "register", component: SignUpComponent, canActivate: [NotAuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
