import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,InputTextModule ,DropdownModule , CurrencyPipe , DialogModule , ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _ProductsService:ProductsService , private _MessageService:MessageService) {
    this.getProducts()
  }

    allProducts:any[] = []
    products:any[] = []
    getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res:any[]) => {
        this.products = res?.map((pro:any)=>{return {...pro , isLoading:false , count:1 }}).slice(0,14)
        this.allProducts = this.products
      }
    })
  }


    handleAddToCard(product: any) {
    product.isLoading = true;

    const data = {
      user_id: JSON.parse(`${localStorage.getItem('userData')}`)?.id,
      product_id: product?.id,
      count:product?.count
    }

    this._ProductsService.addProductToCard(data).subscribe({
      next: (res: any) => {
        product.isLoading = false;
        product.count = 1
        this._MessageService.add({severity:'success' , summary:'عملية ناجحة' , detail:'تم اضافة المنتج بنجاح'})
      }
    })
  }



  incrementCount(product:any) {
    product.count += 1;
  }

  decrementCount(product: any) {
    if (product.count == 1) {
      return
    } else {
      product.count--;
    }
  }
}
