import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {

  }

  async ngOnInit() {

  }

  isLoggedIn() {
    const user = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    return !(isNullOrUndefined(user) || isNullOrUndefined(password));
  }
}
