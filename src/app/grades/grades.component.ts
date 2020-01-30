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

  counterInterval;

  semesters = new FormControl();

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate: TemplateRef<any>;

  constructor(private api: ApiService, private router: Router) {
  }

  async ngOnInit() {
    await this.refresh();
  }

  async changeSelection() {
    if (this.semesters.valid) {
      await this.refresh();
    }
  }

  applyFilter(semesters) {
    this.visualModules = this.data.modules.filter(module => semesters.some(sem => module.semesters.includes(sem)));
  }

  async refresh() {
    this.loading = true;

    if (!(await this.api.isUserAuthenticated('', ''))) {
      await this.router.navigate(['/login']);
      return;
    } else {
      try {
        this.data = (await this.api.getUserModules(this.semesters.value)).data;
      } catch (e) {
        await this.api.logout();
        await this.router.navigate(['/login']);
        return;
      }

      // put failed modules at front
      for (let i = 0; i < this.data.modules.length; i++) {
        if (this.data.modules[i].passed === false && i !== 0) {
          this.data.modules.unshift(this.data.modules[i]);
          this.data.modules.splice(i + 1, 1);
        }
      }
    }
    this.visualModules = this.data.modules;
    this.loading = false;

    this.semesters.setValue(this.data.semesterFilter);
    this.applyFilter(this.data.semesterFilter);

    clearInterval(this.counterInterval);
    this.counterInterval = setInterval(() => this.data.cache += 1, 1000);
  }
}
