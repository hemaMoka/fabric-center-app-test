import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,InputTextModule ,DropdownModule , CurrencyPipe , DialogModule , ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(private _MessageService:MessageService,private _ProductsService:ProductsService)  {

  }
  categories: any[] = [
    {
      id: 0,
      name: 'الكل',
      value:'all'
    },
    {
      id: 1,
      name: 'فسكوز',
      value:'fescoz'
    },
    {
      id: 2,
      name: 'كتان',
      value:'ktan'
    },
    {
      id: 3,
      name: 'ستان',
      value:'satan'
    },
    {
      id: 4,
      name: 'شيفون',
      value:'shefon'
    },
  ]


  searchText:string = ''
  products:any[] = []


  ngOnInit(): void {
    this.getProducts()

  }

  allProducts:any[] = []

  currentProductToShow: any;


  handleShowCurrentProduct(product:any) {
    this.currentProductToShow = product;
    this.showProductVisible = true
  }

  showProductVisible:boolean = false


  getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res:any[]) => {
        this.products = res?.map((pro:any)=>{return {...pro , isLoading:false , count:1 }})
        this.allProducts = this.products
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


  handleFilterCat(event: any) {
    const value = event?.value;


    console.log(value);

    if (value?.id !== 0) {

      this.products = this.allProducts.filter((pro:any)=> {return pro?.category == value?.value})
    } else {
      this.products = this.allProducts
    }


    console.log(this.currentProductToShow);


  }

  handleSearch() {
    this.products = this.allProducts.filter((pro:any)=>{return pro?.title.includes(this.searchText)})
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

}
