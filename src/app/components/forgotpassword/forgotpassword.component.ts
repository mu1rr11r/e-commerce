import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
     private readonly _AuthService=inject(AuthService);

  step: number = 1;
  isLoading = false;
  message = '';

  VaryfyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
   Varyfycode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required ,Validators.pattern(/^[0-9]{6}$/)])
  });
  ResetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ])
  });










  
onSubmitEmail(): void {
    if (this.VaryfyEmail.invalid) {
      return;
    }

    this.isLoading = true;
    this._AuthService.setforgetpassword(this.VaryfyEmail.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.status === 'success') {
          this.step = 2;
          this.message = '';
        } else {
          this.message = res?.message || 'Failed to send reset link.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.message = err?.message || 'حدث خطأ أثناء إرسال الرابط.';
      }
    });
  }

  onVerifyCode(): void {
    if (this.Varyfycode.invalid) {
      return;
    }

    const payload = {
      email: this.VaryfyEmail.value.email,
      resetCode: this.Varyfycode.value.resetCode
    };

    this.isLoading = true;
    this._AuthService.setvaryfy(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.status === 'success') {
          this.step = 3;
          this.message = '';
        } else {
          this.message = res?.message || 'Invalid verification code.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.message = err?.message || 'حدث خطأ أثناء التحقق من الكود.';
      }
    });
  }

  onResetPassword(): void {
    if (this.ResetPassword.invalid) {
      return;
    }

    const payload = {
      email: this.VaryfyEmail.value.email,
      resetCode: this.Varyfycode.value.resetCode,
      newPassword: this.ResetPassword.value.newPassword
    };

    this.isLoading = true;
    this._AuthService.setResetPassword(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.status === 'success') {
          this.message = 'Password reset successfully. Please sign in.';
          this.step = 1;
          this.VaryfyEmail.reset();
          this.Varyfycode.reset();
          this.ResetPassword.reset();
        } else {
          this.message = res?.message || 'Failed to reset password.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.message = err?.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور.';
      }
    });
  }
}
