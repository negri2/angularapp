import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '../../models/alert';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }

      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

  iconByType(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'check_circle';
      case AlertType.Error:
        return 'error';
      case AlertType.Warning:
        return 'warning';
    }
  }

}
