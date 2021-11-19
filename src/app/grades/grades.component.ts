import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../environments/environment';


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
  groupCheck: boolean[];
  groupIndeterminate: boolean[];

  public loadingTemplate: TemplateRef<any>;

  constructor(private api: ApiService, private router: Router, @Inject(DOCUMENT) public document: Document, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.refresh();
  }

  /**
   * Opens a snackbar with a predefined message
   */
  openSnackbar() {
    this.snackBar.open('Exporting all grades', undefined, {
      duration: 5000
    });
  }

  /**
   * Change event on year filter change
   * Handle the correct set of selected semesters
   *
   * @param changeIndex the index of the changed checkbox
   * @param event the event
   */
  groupCheckChanged(changeIndex: number, event) {
    let newSelection = this.semesters.value;
    if (event.checked) {
      newSelection = newSelection
        .concat(this.data.semesters[changeIndex])
        .filter((a, b, array) => array.indexOf(a) === b);
    } else {
      newSelection = newSelection.filter(semester => !this.data.semesters[changeIndex].includes(semester));
    }
    this.semesters.setValue(newSelection);
    this.changeSelection();
  }

  /**
   * Change event for semester filter change
   * Send the current filter to the server and apply it locally
   */
  changeSelection() {
    if (this.semesters.valid) {
      this.api.setSemesterFilter(this.semesters.value)
        .catch(err => console.warn('Error while updating filter', err));

      this.data.semesters.forEach((yearSemesters, i) => {
        if (yearSemesters.every(semester => this.semesters.value.includes(semester))) {
          this.groupCheck[i] = true;
          this.groupIndeterminate[i] = false;
        } else if (yearSemesters.some(semester => this.semesters.value.includes(semester))) {
          this.groupIndeterminate[i] = true;
        } else {
          this.groupCheck[i] = false;
          this.groupIndeterminate[i] = false;
        }
      });
      this.applyFilter(this.semesters.value);
    }
  }

  /**
   * Applies filter on the modules by semester names
   *
   * @param semesters the semesters to keep visual
   */
  applyFilter(semesters) {
    this.visualModules = this.data.modules.filter(module => semesters.some(sem => module.semesters.includes(sem)));
  }

  /**
   * Reload all module data from the server and preparing the data to be used locally
   */
  async refresh() {
    this.loading = true;

    try {
      if (!(await this.api.isUserAuthenticated('', ''))) {
        await this.router.navigate(['/login']);
        return;
      }
      this.data = (await this.api.getUserModules()).data;
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

    this.prepareData();

    this.loading = false;
  }

  prepareData() {
    // put failed modules at front
    for (let i = 0; i < this.data.modules.length; i++) {
      if (this.data.modules[i].passed === false && i !== 0) {
        this.data.modules.unshift(this.data.modules[i]);
        this.data.modules.splice(i + 1, 1);
      }
    }

    this.visualModules = this.data.modules;

    this.groupIndeterminate = new Array(this.data.semesters.length);
    this.groupCheck = new Array(this.data.semesters.length);

    this.semesters.setValue(this.data.semesterFilter || this.data.semesters[0]);
    this.changeSelection();

    clearInterval(this.counterInterval);
    this.counterInterval = setInterval(() => this.data.cache += 1, 1000);
  }

  /**
   * Click event for the export modules button. Simply calls the backend to download the file
   */
  exportModules() {
    const link = document.createElement('a');
    link.download = 'modules.xlsx';
    link.href = environment.backendURL + '/modules/export';
    link.click();
    this.openSnackbar();
  }
}
