import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {FormControl} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {MatSnackBar} from '@angular/material';


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

  constructor(private api: ApiService, private router: Router, @Inject(DOCUMENT) public document: Document, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.refresh();
  }

  openSnackbar() {
    this.snackBar.open('Exporting all grades', undefined, {
      duration: 5000
    });
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

    try {
      if (!(await this.api.isUserAuthenticated('', ''))) {
        await this.router.navigate(['/login']);
        return;
      } else {
        this.data = (await this.api.getUserModules(this.semesters.value)).data;

        // put failed modules at front
        for (let i = 0; i < this.data.modules.length; i++) {
          if (this.data.modules[i].passed === false && i !== 0) {
            this.data.modules.unshift(this.data.modules[i]);
            this.data.modules.splice(i + 1, 1);
          }
        }
      }
    } catch (e) {
      if (e.code === 401) {
        // unauthenticated
        await this.api.logout();
        await this.router.navigate(['/login']);
        return;
      }
      console.error(e);
      await this.router.navigate(['/error']);
    }
    this.visualModules = this.data.modules;
    this.loading = false;

    this.semesters.setValue(this.data.semesterFilter || this.data.semesters);
    this.applyFilter(this.data.semesterFilter || this.data.semesters);

    clearInterval(this.counterInterval);
    this.counterInterval = setInterval(() => this.data.cache += 1, 1000);
  }

  exportModules() {
    const link = document.createElement('a');
    link.download = 'modules.xlsx';
    link.href = '/backend/modules/export';
    link.click();
    this.openSnackbar();
  }
}
