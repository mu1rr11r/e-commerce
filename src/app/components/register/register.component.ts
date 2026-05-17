import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{

private readonly _AuthService=inject(AuthService);
private readonly _Router=inject(Router)
private readonly _FormBuilder=inject(FormBuilder);

maserror:string='';
setTimeout:boolean=false;
isloading:boolean=false;

regesSubscription !:Subscription

registerform: FormGroup =this._FormBuilder.group({

  name:[null,[Validators.required, Validators.minLength(3),Validators.maxLength(20)],],

  email:[null,[Validators.required,Validators.email]],

  
  password:[null,[ Validators.pattern( '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$' )]],
 
  rePassword:[null,[  Validators.required]],


  phone:[null, [Validators.required,
    Validators.pattern('^01[0125][0-9]{8}$')]],
    
},{validators:this.rePassword})







register():void{
  if(this.registerform.valid)
  {
    this.isloading=true;
   this.regesSubscription = this._AuthService.setregister(this.registerform.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.message === 'success')
      {
        this.setTimeout=true;
        setTimeout(()=>{
          this._Router.navigate(['/auth/login'])
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
  else{
    this.registerform.markAllAsTouched();
  }
}


ngOnDestroy(): void {
  this.regesSubscription?.unsubscribe();
}








rePassword(g:AbstractControl)
{
  if(g.get('password')?.value === g.get('rePassword')?.value)
  {
    return null;
  }
  else
  {
    return {mismatch:true};
  }
}

}

