import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../../models/alert';
import { Router, NavigationStart } from '@angular/router';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.clear();

    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}
