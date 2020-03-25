import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  username: string = '03425419005';
  password: string = '12345';

  constructor(private form: FormBuilder,
    private loginService: LoginService,
    private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.submitted = true;

    this.router.navigate([this.returnUrl]);

    this.loginService.login(this.username, this.password)
      .then(data => {
        this.router.navigate([this.returnUrl]);
      })
      .catch(error => {
        this.error = 'Usuário e senha não encontrados.';
        this.loading = false;
      });
  }
}
