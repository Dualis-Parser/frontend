import { Component, OnInit } from '@angular/core';
import {version} from '../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version: string = version;
  private year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
