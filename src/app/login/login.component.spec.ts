import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {NgxLoadingModule} from 'ngx-loading';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [NgxLoadingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const http = TestBed.get(HttpTestingController);

    http.expectOne(environment.backendURL + '/login').flush({});
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', fakeAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();

    const http = TestBed.get(HttpTestingController);

    http.expectOne(environment.backendURL + '/login').flush({}, {status: 401, statusText: 'Unauthorized'});
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.error).toContain('Invalid');
  }));

  it('should submit form with error', fakeAsync(() => {
    const routerstub: Router = TestBed.get(Router);

    spyOn(routerstub, 'navigate').and.stub();
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();

    const http = TestBed.get(HttpTestingController);

    http.expectOne(environment.backendURL + '/login').flush({}, {status: 500, statusText: 'Internal'});
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should navigate to error', fakeAsync(() => {
    spyOn(console, 'error');

    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate').and.stub();

    component.validateLogin();

    const http = TestBed.get(HttpTestingController);

    http.expectOne(environment.backendURL + '/login').flush({}, {status: 500, statusText: 'Internal'});
    tick();

    expect(console.error).toHaveBeenCalled();
  }));
});
