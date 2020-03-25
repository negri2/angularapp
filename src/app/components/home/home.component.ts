import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: Array<any>;
  error: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
}
