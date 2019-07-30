import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
