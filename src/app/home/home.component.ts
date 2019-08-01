import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loadingTemplate: TemplateRef<any>;

  constructor(private api: ApiService, private router: Router) {
  }

  async ngOnInit() {
    const user = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    if (!isNullOrUndefined(user) && !isNullOrUndefined(password)) {
      if (!(await this.api.isUserAuthenticated(user, password))) {
        await this.router.navigate(['/login']);
      } else {
        await this.router.navigate(['/grades']);
      }
    } else {
      await this.router.navigate(['/login']);
    }
  }

}
