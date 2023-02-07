import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  change:boolean = false;
  user!: User;

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.profile().subscribe((data:any) => {
      this.user = data;
      this.change = false;
      if (!this.user.name) {
        this.change = true;
      }
      this.profileForm.patchValue({
        name: this.user.name, 
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        address: this.user.address
      }) 
    })
  }

  onSubmit() {
    this.authService.update(this.profileForm.value).subscribe((data: any) => {
      this.ngOnInit();
    })
  }

  update_change(){
    this.change=true;
  }

  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    this.router.navigate(['/login'])
  }
}
