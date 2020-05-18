import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books?size=100"

  constructor(private httpCliente: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.httpCliente.get<GetResponseBooks>(this.baseUrl).pipe(
      map(response => response._embedded.books)
    )
  }
}

interface GetResponseBooks{
  _embedded: {
    books: Book[];
  }
}