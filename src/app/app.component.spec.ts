import { TestBed, waitForAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AngularMaterialModule} from './angular-material.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FooterComponent} from './footer/footer.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, AngularMaterialModule, MatToolbarModule, HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dualis Parser'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Dualis Parser');
  });
});
