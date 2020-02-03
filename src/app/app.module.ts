import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {GradesComponent} from './grades/grades.component';
import {ImprintComponent} from './imprint/imprint.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {LogoutComponent} from './logout/logout.component';
import {InternalErrorComponent} from './internal-error/internal-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GradesComponent,
    ImprintComponent,
    LoginComponent,
    LogoutComponent,
    InternalErrorComponent
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
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
