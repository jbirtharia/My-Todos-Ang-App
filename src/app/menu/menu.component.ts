import { HardcodedAuthenticationService } from './../services/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authenticatioService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

  }

}
