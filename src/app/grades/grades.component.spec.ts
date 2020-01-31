import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GradesComponent} from './grades.component';
import {NgxLoadingModule} from 'ngx-loading';
import {AngularMaterialModule} from '../angular-material.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('GradesComponent', () => {
  let component: GradesComponent;
  let fixture: ComponentFixture<GradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GradesComponent],
      imports: [
        NgxLoadingModule, AngularMaterialModule, MatSelectModule, FormsModule, MatFormFieldModule,
        ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
