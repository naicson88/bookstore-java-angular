import {Injectable} from '@angular/core'
import { CartItem } from '../common/cart-item'
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService{

    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    constructor(){}

    addToCart(theCartItem: CartItem){
        //Checar se o livro ja esta no cart
        let alreadyInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if(this.cartItems.length > 0){
            //verificar livro ou item pelo id
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

            alreadyInCart = (existingCartItem != undefined);
        }

        if(alreadyInCart){
            //Incrementa a quantidade
            existingCartItem.quantity++;
        } else {
            this.cartItems.push(theCartItem);
        }

        this.calculateTotalPrice(theCartItem)
    }

    calculateTotalPrice(theCartItem: CartItem){
        let totalPriceValue : number = 0;
        let totalQuantityValue : number = 0;

        //calcula preço e quantidade
        for ( let currentCartItem of this.cartItems){
           totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
           totalQuantityValue += currentCartItem.quantity;
        }

        console.log(`total price ${totalPriceValue}, quantidade ${totalQuantityValue}`);

        //publica os eventos
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue)
    }
}