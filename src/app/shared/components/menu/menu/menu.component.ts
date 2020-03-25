import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: Array<any> = [
    {
      title: 'Empresas',
      icon: 'business',
      route: 'home',
    },
    {
      title: 'Usuários',
      icon: 'people',
      route: 'home',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
