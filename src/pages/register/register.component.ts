import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass , InputTextModule , ButtonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {



  constructor(private _Router:Router,private _MessageService:MessageService ,private _authS:AuthService) {

  }

  loadingLogin = signal<boolean>(false)

  ngOnInit(): void {
      this.getAllUsers()
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null , [Validators.required])
  })

  showPassword = signal<boolean>(false);

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword())
  }


  appUsers:any[] = []


  getAllUsers() {
    this._authS.getUsers().subscribe({
      next: (res) => {
        this.appUsers = res
      }
    })
  }

  handleLogin() {
    this.loadingLogin.set(true)

    this._authS.addUser(this.loginForm.value).subscribe({
      next: (res:any) => {
        this._MessageService.add({severity:'success' , summary:'عمليه ناجحة' , detail:'تم انشاء حساب بنجاح'})
        this._Router.navigate(['/login'])
        this.loadingLogin.set(false)
      }
    })


  }


}
