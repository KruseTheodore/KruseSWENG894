import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Profile } from 'src/app/profile';
import { AuthService } from '../shared/auth.service';
import { SignupPayload } from './signup.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupPayload: SignupPayload;
  signupForm: FormGroup;
  

  constructor(private authService: AuthService) {
    this.signupPayload = {
      username: '',
      password : ''
    };
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    
  }

  signup(){
    this.signupPayload.username = this.signupForm.get('username')?.value;
    this.signupPayload.password = this.signupForm.get('password')?.value;
    
    //console.log(this.signupPayload);
    //var payload = JSON.stringify({"name": this.signupPayload.username, "password": this.signupPayload.password});
    //console.log(payload);

    this.authService.checkUser(this.signupPayload).subscribe(data => {
      if(data===true){
        this.authService.signup(this.signupPayload)
    .subscribe(data => {
      console.log(data);
    })
      }})
      



    
  }

}
