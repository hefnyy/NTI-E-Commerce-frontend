import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { MyprofileService } from '../services/myprofile.service';
import { GlobalServicesService } from '../services/global-services.service';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnDestroy,OnInit {

  currentPasswordError:string='';
  passwordError:string='';

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  constructor(private _AuthService: AuthenaticationsService, private _MyprofileService: MyprofileService,
    private _GlobalService: GlobalServicesService) { }

    changeUserPassword(formData:FormGroup){
      this._MyprofileService.changeUserPassword(formData.value).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveLoggedInUser();
          alert('password changed')
        }, error: (err) => {
          err.error.errors.map((error: any) => {
            if (error.path === 'currentPassword')  
              this.currentPasswordError = error.msg 
            else if (error.path === 'password')  
              this.passwordError = error.msg 
          })
      }
    })
    }

    ngOnInit(): void {
      
    }
    ngOnDestroy(): void {
      
    }
}
