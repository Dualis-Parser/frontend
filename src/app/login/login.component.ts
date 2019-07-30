import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined, isUndefined} from 'util';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  error: string;
  loading = false;

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {
    const user = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    if (!isNullOrUndefined(user) && !isNullOrUndefined(password)) {
      this.loading = true;
      if (!(await this.api.isUserAuthenticated(user, password))) {
        console.log('False');
      } else {
        await this.router.navigate(['/grades']);
      }
      this.loading = false;
    }
  }

  async onSubmit() {
    this.loading = true;
    let username: string = this.angForm.controls.username.value;
    if (!username.includes('@')) {
      username += '@dh-karlsruhe.de';
    }
    const password = this.angForm.controls.password.value;
    if (!(await this.api.isUserAuthenticated(username, password))) {
      this.error = 'Invalid username or password. Try again.';
    } else {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      await this.router.navigate(['/grades']);
    }
    this.loading = false;
  }
}
