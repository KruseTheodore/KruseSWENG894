import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthService } from '../shared/auth.service';
import { LoginPayload } from './login.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPayload: LoginPayload;
  loginForm: FormGroup;
  

  constructor(private authService: AuthService, private header: HeaderComponent, private router: Router, private toastr: ToastrService) {
    this.loginPayload = {
      username: '',
      password : ''
    };
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    
  }

  login(){
    this.loginPayload.username = this.loginForm.get('username')?.value;
    this.loginPayload.password = this.loginForm.get('password')?.value;
    //console.log(this.loginPayload);
    //var payload = JSON.stringify({"name": this.loginPayload.username, "password": this.loginPayload.password});
    //console.log(payload);

    this.authService.login(this.loginPayload)
    .subscribe(data => {
      //console.log(data);
      this.header.ngOnInit();
      this.toastr.success('Logged in successfully!');
      this.router.navigate(['/home']);
    }, () => {
      this.toastr.error('Login failed please check credentials and retry.')
    })
  }

}
