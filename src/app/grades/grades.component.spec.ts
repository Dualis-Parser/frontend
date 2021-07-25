import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {GradesComponent} from './grades.component';
import {NgxLoadingModule} from 'ngx-loading';
import {AngularMaterialModule} from '../angular-material.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCheckboxModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../environments/environment';

describe('GradesComponent', () => {
  let component: GradesComponent;
  let fixture: ComponentFixture<GradesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GradesComponent],
      imports: [
        NgxLoadingModule, AngularMaterialModule, MatSelectModule, MatSnackBarModule, FormsModule, MatFormFieldModule,
        ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatCheckboxModule, BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.data = {
      semesters: [['val1', 'val2'], ['val3', 'val4']],
      modules: [{semesters: [], passed: false}, {semesters: [], passed: false}]
    };
    component.groupCheck = component.groupIndeterminate = [false, false];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download the xlsx file', () => {
    const spyObj = jasmine.createSpyObj('a', ['click']);
    spyOn(document, 'createElement').and.returnValue(spyObj);
    spyOn(component, 'openSnackbar').and.callThrough();

    try {
      component.exportModules();
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
    }
    expect(document.createElement).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');

    expect(spyObj.href).toBe(environment.backendURL + '/modules/export');
    expect(spyObj.download).toBe('modules.xlsx');
    expect(spyObj.click).toHaveBeenCalled();

    expect(component.openSnackbar).toHaveBeenCalled();
  });

  it('should change selection and apply filter (unchecked)', () => {
    component.semesters.setValue(['val1', 'val2', 'val3', 'val4']);

    spyOn(component, 'groupCheckChanged').and.callThrough();
    spyOn(component, 'changeSelection').and.callThrough();
    spyOn(component, 'applyFilter').and.callThrough();

    component.groupCheckChanged(0, {checked: false});

    expect(component.groupCheckChanged).toHaveBeenCalled();
    expect(component.changeSelection).toHaveBeenCalled();
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should change selection and apply filter (checked)', fakeAsync(() => {
    component.semesters.setValue(['val1', 'val2', 'val3']);

    spyOn(component, 'groupCheckChanged').and.callThrough();
    spyOn(component, 'changeSelection').and.callThrough();
    spyOn(component, 'applyFilter').and.callThrough();

    component.groupCheckChanged(0, {checked: true});

    const http: HttpTestingController = TestBed.get(HttpTestingController);
    http.expectOne(environment.backendURL + '/modules/filter').flush({}, {status: 401, statusText: 'Unauthorized'});
    tick();

    expect(component.groupCheckChanged).toHaveBeenCalled();
    expect(component.changeSelection).toHaveBeenCalled();
    expect(component.applyFilter).toHaveBeenCalled();
  }));

  it('prepare api data', () => {
    spyOn(component, 'prepareData').and.callThrough();
    spyOn(global, 'setInterval').and.callThrough();

    component.prepareData();

    expect(global.setInterval).toHaveBeenCalled();
    expect(component.prepareData).toHaveBeenCalled();
  });

  it('should refresh', fakeAsync(() => {
    spyOn(component, 'refresh').and.callThrough();

    const profileInfo = {status: 200, description: 'OK', data: true};
    const moduleInfo = {
      data: {
        semesters: [['val1', 'val2'], ['val3', 'val4']],
        modules: [{semesters: [], passed: false}, {semesters: [], passed: false}]
      }
    };
    const http: HttpTestingController = TestBed.get(HttpTestingController);

    // component init login
    http.expectOne(environment.backendURL + '/login').flush(profileInfo);
    tick();

    component.refresh();
    http.expectOne(environment.backendURL + '/login').flush(profileInfo);
    http.expectOne(environment.backendURL + '/modules').flush(moduleInfo);

    tick();
    tick(2000);
    discardPeriodicTasks();

    expect(component.refresh).toHaveBeenCalled();
  }));
});
