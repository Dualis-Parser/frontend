import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ApiService]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should get invalid login', fakeAsync(() => {
    const profileInfo = {status: 200, description: 'OK', data: true};
    const apiService: ApiService = TestBed.get(ApiService);
    const http = TestBed.get(HttpTestingController);
    let authResponse;

    apiService.isUserAuthenticated('', '').then(response => {
      authResponse = response;
    });

    http.expectOne(environment.backendURL + '/login').flush(profileInfo, {status: 401, statusText: 'Unauthorized'});

    tick();
    expect(authResponse).toBeFalse();
  }));

  it('should get valid login', fakeAsync(() => {
    const profileInfo = {status: 200, description: 'OK', data: true};
    const apiService: ApiService = TestBed.get(ApiService);
    const http = TestBed.get(HttpTestingController);
    let authResponse;

    apiService.isUserAuthenticated('', '').then(response => {
      authResponse = response;
    });

    http.expectOne(environment.backendURL + '/login').flush(profileInfo);

    tick();
    expect(authResponse).toBeTrue();
  }));

  it('should get user modules', fakeAsync(() => {
    const userModules = {};
    const apiService: ApiService = TestBed.get(ApiService);
    const http = TestBed.get(HttpTestingController);
    let moduleResponse;

    apiService.getUserModules().then((response) => {
      moduleResponse = response;
    });

    http.expectOne(environment.backendURL + '/modules').flush(userModules);

    tick();
    expect(moduleResponse).toEqual(userModules);
  }));

  it('should post semester filter', fakeAsync(() => {
    const filter = {};
    const apiService: ApiService = TestBed.get(ApiService);
    const http = TestBed.get(HttpTestingController);
    let moduleResponse;

    apiService.setSemesterFilter(['val1']).then((re) => moduleResponse = re);

    http.expectOne(environment.backendURL + '/modules/filter').flush(filter);

    tick();
    expect(moduleResponse).toEqual(filter);
  }));

  it('should logout', fakeAsync(() => {
    const apiService: ApiService = TestBed.get(ApiService);
    const http = TestBed.get(HttpTestingController);
    let logoutResponse;

    apiService.logout().then((re) => logoutResponse = re);

    http.expectOne(environment.backendURL + '/logout').flush({status: 200});

    tick();
    expect(logoutResponse).toEqual({status: 200});
  }));

  it('handle login error (401)', () => {
    const apiService: ApiService = TestBed.get(ApiService);
    spyOn(apiService, 'handleLoginError').and.callThrough();

    const result = apiService.handleLoginError({status: 401});

    expect(apiService.handleLoginError).toHaveBeenCalled();
    expect(result).toBeFalse();

  });

  it('handle login error (internal)', () => {
    const apiService: ApiService = TestBed.get(ApiService);

    expect(() => apiService.handleLoginError({status: 500})).toThrow();
  });
});
