import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  currentUser: any;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
