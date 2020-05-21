import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private _bookService: BookService,
    private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this._activeRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })

  }

  listBooks(){

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
  }

  handleSearchBooks(){
    const keyword: string = this._activeRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword).subscribe(
      data => {
        console.log(data);

      }
    )
  }
}
