import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../api.service';
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
    await this.router.navigate(['/login']);
  }

}
