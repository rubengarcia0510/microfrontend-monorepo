import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICommonsProducts } from './icommonsproducts';

@Injectable({
  providedIn: 'root'
})
export class CommonsLibService {
  private _products: ICommonsProducts[] = []
  private _channelSource = new BehaviorSubject<number>(0)
  channelPayment$ = this._channelSource.asObservable()
  constructor() { }

  sendData(products:ICommonsProducts):void{
    this._products.push(products)
    localStorage.setItem('products',JSON.stringify(this._products))
    this._channelSource.next(this._products.length)
  }
}
