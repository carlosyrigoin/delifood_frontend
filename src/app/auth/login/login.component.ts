import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("id", data.id);
        this.router.navigate(['/profile']);
      } else {
        alert("Usuario o clave incorrectos")
      }
    })
  }
}
