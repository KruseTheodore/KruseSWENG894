import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BourbonService } from '../bourbon.service';
import { BourbonPayload } from './bourbon.payload';

@Component({
  selector: 'app-new-bourbon',
  templateUrl: './new-bourbon.component.html',
  styleUrls: ['./new-bourbon.component.css']
})
export class NewBourbonComponent implements OnInit {

  bourbonPayload: BourbonPayload;
  bourbonForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private bourbonService: BourbonService,
    private router: Router,
    private toastr: ToastrService) {
      this.bourbonPayload = {
        name: '',
        distil:'',
        proof: NaN
      };
     }

  ngOnInit(): void {
    this.bourbonForm = new FormGroup({
      name: new FormControl('', Validators.required),
      distil: new FormControl('', Validators.required),
      proof: new FormControl('', Validators.required)
    });

  }

  onSubmit(){

    if(this.bourbonForm.valid){
      this.newBourbon();
    }
    else{
      this.toastr.error('Please fill out Bourbon Name, Distillery, and Proof and try submitting again.');
    }

  }

  newBourbon(){
    this.bourbonPayload.name = this.bourbonForm.get('name')?.value;
    this.bourbonPayload.distil = this.bourbonForm.get('distil')?.value;
    this.bourbonPayload.proof = this.bourbonForm.get('proof')?.value;

    this.bourbonService.addBourbon(this.bourbonPayload).subscribe(data => {
      this.toastr.success('Bourbon added!');
      this.router.navigate(['/bourbon']);
    }, () => {
      this.toastr.error('Failed to add bourbon please refresh and try agian.');
    });
    
  }
}
