import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {GradesComponent} from './grades/grades.component';
import {ImprintComponent} from './imprint/imprint.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {LogoutComponent} from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GradesComponent,
    ImprintComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
