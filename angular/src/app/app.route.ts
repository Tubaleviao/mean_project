import { RouterModule, Routes } from "@angular/router";
import {LoginComponent} from './components/login.component'
import {HomeComponent} from './components/home.component'

// import { MyCanActivateGuard } from "./guards/mycanactivate.guard";

const MY_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent }
];

export const Router = RouterModule.forRoot(MY_ROUTES);