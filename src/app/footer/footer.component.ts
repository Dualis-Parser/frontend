import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version = '0.2.10';
  public year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
