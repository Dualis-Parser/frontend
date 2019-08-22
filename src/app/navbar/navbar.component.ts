import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
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
    return sessionStorage.loggedIn === 'true';
  }
}
