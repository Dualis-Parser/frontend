import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {InternalErrorComponent} from './internal-error.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from '../../environments/environment';

describe('InternalErrorComponent', () => {
  let component: InternalErrorComponent;
  let fixture: ComponentFixture<InternalErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternalErrorComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stay on errorpage', fakeAsync(() => {
    spyOn(console, 'error');

    const http = TestBed.get(HttpTestingController);
    http.expectOne(environment.backendURL + '/login').flush({}, {status: 401, statusText: 'Unauthorized'});
    tick();

    expect(console.error).toHaveBeenCalled();
  }));
});
