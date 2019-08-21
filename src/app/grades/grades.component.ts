import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
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
    await this.refresh();
  }

  changeSelection() {
    if (this.semesters.valid) {
      this.visualModules = this.data.modules.filter(module => this.semesters.value.some(sem => module.semesters.includes(sem)));
    }
  }

  async refresh() {
    this.loading = true;
    if (this.cached) {
      this.cached = false;
    }
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
        try {
          this.data = (await this.api.getUserModules()).data;
        } catch (e) {
          await this.api.logout();
          await this.router.navigate(['/login']);
        }
        // put failed modules at front
        for (let i = 0; i < this.data.modules.length; i++) {
          if (this.data.modules[i].passed === false && i !== 0) {
            this.data.modules.unshift(this.data.modules[i]);
            this.data.modules.splice(i + 1, 1);
          }
        }
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
}
