import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books : Book[];
  currentCategoryId: number;
  searchMode: boolean;
  //pageOfItens: Array<Book>;
  p : number =  1;
 

  constructor(private _bookService: BookService,
    private _activeRoute: ActivatedRoute,
    private _cartService: CartService,
    private _ngxSpinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    
    this._activeRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })

  }

  /*pageClick(pageOfItens: Array<Book>){
    this.pageOfItens = pageOfItens
  }*/

  listBooks(){

    this._ngxSpinner.show();
    this.searchMode = this._activeRoute.snapshot.paramMap.has('keyword');
    
    if(this.searchMode){
      //do search work
      this.handleSearchBooks();
    } else {
      //display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks(){
    setTimeout(() => {
      this._ngxSpinner.hide();
      const hasCategoryId: boolean = this._activeRoute.snapshot.paramMap.has('id');
  
      if(hasCategoryId){
        this.currentCategoryId = +this._activeRoute.snapshot.paramMap.get('id');
      } else {
        this.currentCategoryId = 1;
      }
  
      this._bookService.getBooks(this.currentCategoryId).subscribe(
        data => {
          this.books = data
        }
    
      )
    }, 1000)
   
  }

  handleSearchBooks(){
    setTimeout(() => {
      this._ngxSpinner.hide();
      const keyword: string = this._activeRoute.snapshot.paramMap.get('keyword');

      this._bookService.searchBooks(keyword).subscribe(
        data => {
          this.books = data;
        }
      )
    }, 1000)
  
  }

  updatePageSize(pageSize: number){
    this.updatePageSize
  }

  addToCart(book: Book){
    console.log(`book name: ${book.name}, price: ${book.unitPrice}`)
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
}
