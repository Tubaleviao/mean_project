import { BrowserModule } from "@angular/platform-browser";
import { AngularMaterialModule } from "./angular-material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { MainInterceptor } from "./interceptors/main-interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SocketService } from "./services/socket.service";
import { PipesModule } from "./pipes/pipes.module";
import { ProfileComponent } from './components/profile.component';

@NgModule({
  declarations: [ AppComponent, ProfileComponent, SignInComponent, SignUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    MatSnackBarModule,
    PipesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    },
    SocketService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
