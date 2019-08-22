import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  error: string;
  loading = false;

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
    this.loading = true;
    if (!(await this.api.isUserAuthenticated('', ''))) {

    } else {
      await this.router.navigate(['/grades']);
    }
    this.loading = false;
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
      await this.router.navigate(['/grades']);
    }
    this.loading = false;
  }
}
