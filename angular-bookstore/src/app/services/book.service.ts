import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpCliente: HttpClient) { }

  getBooks(getid : number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${getid}`
    return this.getBooksList(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpCliente.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpCliente.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    )
  }

  searchBooks(keyword : string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`
    return this.getBooksList(searchUrl);
  }

  get(bookId: number): Observable<Book>{
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return  this.httpCliente.get<Book>(bookDetailsUrl); 
  }

}

interface GetResponseBooks{
  _embedded: {
    books: Book[];
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategory: BookCategory[];
  }
}