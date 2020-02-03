import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss']
})
export class InternalErrorComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
  }

  async ngOnInit() {
    try {
      await this.api.isUserAuthenticated('', '');
      await this.router.navigate(['/login']);
    } catch (e) {
      console.error(e);
    }
  }

}
