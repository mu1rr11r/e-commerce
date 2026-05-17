import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router=inject(Router)
  
 maserror:string='';
setTimeout:boolean=false;
isloading:boolean=false;

  loginform = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    ]]
  });

  login(): void {
    if (this.loginform.valid) {
     this.isloading = true;
     this._AuthService.setlogin(this.loginform.value).subscribe({
      next:(res)=>{
        console.log(res);
      if(res.message === 'success')
      {
            localStorage.setItem('usertoken', res.token);
        this.setTimeout=true;
        setTimeout(()=>{
      
          this._Router.navigate(['/blank/home']);
        },2000);
        this.isloading=false;
      }
      },
      error:(err:HttpErrorResponse)=>{
        this.isloading=false;
        this.maserror=err.error.message;
        console.log(err);
      }
     })
    }
    else {
      this.loginform.markAllAsTouched();
  }
}}