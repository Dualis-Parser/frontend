import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {isNullOrUndefined, isUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(private api: ApiService, private router: Router) {
    router.events.subscribe(path => {
      const user = sessionStorage.getItem('username');
      const password = sessionStorage.getItem('password');
      this.loggedIn = !(isNullOrUndefined(user) || isNullOrUndefined(password));
    });
  }

  async ngOnInit() {
    const user = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    this.loggedIn = !(isNullOrUndefined(user) || isNullOrUndefined(password));
  }
}
