import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass , InputTextModule , ButtonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  constructor(private _Router:Router,private _MessageService:MessageService ,private _authS:AuthService) {

  }

  loadingLogin = signal<boolean>(false)

  ngOnInit(): void {
      this.getAllUsers()
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
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


    const foundedUser = this.appUsers.filter((user: any) => user?.email === this.loginForm.get('email')?.value)

    setTimeout(() => {

      if (foundedUser.length) {
        if (foundedUser[0]?.password === this.loginForm.get('password')?.value) {
          this._MessageService.add({severity:'success' , summary:"عملية ناجحه" , detail:'تم تسجيل الدخول '})
          this._authS.loginStatus.next(true);
          localStorage.setItem('userData' , JSON.stringify(foundedUser[0]))
          this._Router.navigate(['/home']);

        } else {
          this._MessageService.add({ severity: "error", summary: 'خطأ', detail: 'كلمة السر خطأ' })

        }
        this.loadingLogin.set(false)
      } else {
        this._MessageService.add({ severity: "error", summary: 'خطأ', detail: 'الايميل ليس موجود برجاء انشاء حساب اولا ' })
        this.loadingLogin.set(false)
      }
    }, 1000)


  }

}
