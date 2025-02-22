import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductsComponent } from '../pages/products/products.component';
import { CardComponent } from '../pages/card/card.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => LoginComponent },
  { path: 'register', loadComponent: () => RegisterComponent },
  { path: 'home', loadComponent: () => HomeComponent },
  { path: 'products', loadComponent: () => ProductsComponent },
  { path: 'card', loadComponent: () => CardComponent },
  { path: 'contact-us', loadComponent: () => ContactUsComponent },
  {path:'about-us' , component:AboutUsComponent}
];
