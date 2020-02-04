import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
  }

  async ngOnInit() {
    await this.api.logout();
    await this.router.navigate(['/login']);
  }

}
