import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Router } from '@angular/router';


@Component({
    selector: 'book-list',
    templateUrl: './bookList.component.html',
    styleUrls: ['./bookList.component.css']
})
export class BookListComponent implements OnInit{
    book = new Book();
    statusMessage: string;
    books: Book[];
    constructor(private _bookService: BookService,
                private _router: Router){}
    
    ngOnInit(): void {
        console.log("calling ngOnInit()::::");
        this.getBooks();
    }

    getBooks(): void{
        console.log("Inside getBooks():::::")
        this._bookService.getAllBooks()
            .subscribe((bookData) => this.books = bookData,
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );
        console.log("end of getBooks():::::");
    }
}