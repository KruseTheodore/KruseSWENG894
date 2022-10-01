import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private header: HeaderComponent, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(data => {
      this.header.ngOnInit();
      this.toastr.success('Logged out.');
      this.router.navigate(['/home']);
    })
  }
  

}
