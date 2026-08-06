import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  hasError = signal<boolean>(false);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    const {fullName = '', email = '', password = ''} = this.registerForm.value;

    this.authService.register(fullName!, email!, password!).subscribe(
      (hasRegistered) => {
        if (hasRegistered) {
          this.router.navigateByUrl('/')
        } else {
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 2000);
        }
      }
    )
  }
}
