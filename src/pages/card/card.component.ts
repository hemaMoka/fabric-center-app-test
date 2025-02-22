import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {
    this.userData = JSON.parse(`${localStorage.getItem('userData')}`)
  }



  userData: any;

  userCard:any[] = []

  ngOnInit(): void {
      this.getUserCard()
  }

  getUserCard() {
    this._ProductsService.getUserCard(this.userData?.id).subscribe((res: any[]) => {
      const userCards = res;

      res.map((card:any , index) => {
        this._ProductsService.getSingleProduct(card?.product_id).subscribe((res:any) => {
          userCards[index].product = res
        })
      })


      this.userCard = userCards
    })
  }


  getTotalPrice():any {
    let totalPrice = 0;

    this.userCard.map((card:any) => {
      totalPrice += card?.count * card?.product?.price
    })


    return totalPrice
  }


  deleteCardItem(item: any) {
    this._ProductsService.deleteUserCard(item?.id).subscribe((res:any) => {
      this.getUserCard()
    })
  }

}
