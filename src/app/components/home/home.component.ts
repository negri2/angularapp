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

  totalConsumption: number;
  totalDemand: number;
  isLoading = false;
  pieChartLabels: any;
  pieChartData: any;
  pieChartType = "pie";
  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'bottom',
    },
  };

  chartType = 'PieChart';
  columnNames = ['Valor', 'Percentual'];
  options = {
    is3D: true,
    legend: { position: 'right', alignment: 'start' },
    chartArea: { width: '80%', height: '100%' },
  };

  constructor() {
  }

  ngOnInit() {

    this.loadCharts();
  }

  loadCharts() {

    this.pieChartData = [
      ['Renda Fixa', 0],
      ['FIIs', 0],
      ['Ações', 0],
      ['Internacional', 0]
    ];


    this.pieChartData = [
      ['Renda Fixa', 235651],
      ['FIIs', 560455],
      ['Ações', 456222],
      ['Internacional', 130289]
    ];
  }
}
