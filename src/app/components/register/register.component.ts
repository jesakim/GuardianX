import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/register.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ){}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const controlValue = formGroup.get(controlName)?.value;
      const matchingControlValue = formGroup.get(matchingControlName)?.value;
      
      if (controlValue !== matchingControlValue) {
        formGroup.get(matchingControlName)?.setErrors({ mustMatch: true });
      } else {
        formGroup.get(matchingControlName)?.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const dto: RegisterDto = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
      this.authService.register(dto).subscribe(response => {
        this.authService.saveToken(response.result.token);
        // Redirect to /me
        this.router.navigate(['/me']);
      },
      error => {
        console.log(error.error);
      }
      
      );
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
