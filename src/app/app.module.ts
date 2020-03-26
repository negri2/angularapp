import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DATE_FORMATS, MatSortModule, MatTableModule } from '@angular/material';
import { registerLocaleData, HashLocationStrategy, LocationStrategy } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './shared/services/http/http.service'
import { ApiService } from './shared/services/api/api.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component'
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { JwtInterceptor} from './shared/helpers/jwt.interceptor';
import { NgMaterialModule } from './ngmaterialmodule';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { AlertService } from './shared/services/alert/alert.service';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    ToolbarComponent,
    ConfirmationDialogComponent,
    AlertComponent,
    UserComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    NgxSpinnerModule,
    NgxFileHelpersModule,
    MatSortModule,
    MatTableModule,
    GoogleChartsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpService,
    ApiService,
    AlertService
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
