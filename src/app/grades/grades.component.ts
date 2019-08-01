import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  data;
  visualModules;
  loading = true;
  secondDiff;
  cached = false;

  semesters = new FormControl();

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate: TemplateRef<any>;

  constructor(private api: ApiService, private router: Router) {
  }

  async ngOnInit() {
    const user = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    if (!(await this.api.isUserAuthenticated(user, password))) {
      await this.router.navigate(['/login']);
    } else {
      let isJson = false;
      try {
        JSON.parse(sessionStorage.getItem('userData'));
        isJson = true;
      } catch (e) {
        isJson = false;
      }

      let reload = isJson;
      if (isJson) {
        const cacheTime = new Date(sessionStorage.getItem('cacheTime'));
        this.secondDiff = Math.round((new Date().getTime() - cacheTime.getTime()) / 1000);
        if (this.secondDiff < 120) {
          reload = false;
        }
      }

      if (reload) {
        this.data = (await this.api.getUserModules(user, password)).data;
        sessionStorage.setItem('userData', JSON.stringify(this.data));
        sessionStorage.setItem('cacheTime', new Date().toUTCString());
      } else {
        this.cached = true;
        const cacheTime = new Date(sessionStorage.getItem('cacheTime'));

        setInterval(() => this.secondDiff = Math.round((new Date().getTime() - cacheTime.getTime()) / 1000), 1000);

        this.data = JSON.parse(sessionStorage.getItem('userData'));
      }
    }
    this.semesters.setValue(this.data.semesters);
    this.visualModules = this.data.modules;
    this.loading = false;
  }

  changeSelection() {
    if (this.semesters.valid) {
      this.visualModules = this.data.modules.filter(module => this.semesters.value.some(sem => module.semesters.includes(sem)));
    }
  }

}
