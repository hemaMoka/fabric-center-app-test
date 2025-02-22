import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  constructor(private _Router:Router,private _AuthService:AuthService) {
    this._AuthService.loginStatus.subscribe((res:boolean) => {
      this.isLogin.set(res)
    })
  }


  handleLogout() {
    localStorage.clear()
    this._Router.navigate(['/login'])
    this._AuthService.loginStatus.next(false)
  }

  isLogin = signal<boolean>(false)

}
