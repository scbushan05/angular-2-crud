import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {BookService} from './book.service';
import {Book} from './book';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnChanges{

    books: Book[];
    statusMessage: string;
    book = new Book();
    
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

    addBook(): void{
        console.log("inside the addBook()::::::")
        this._bookService.addBook(this.book)
            .subscribe((response) => {console.log(response); this.getBooks();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );   
        
        console.log("end of addBook()::::");
        //this._router.navigate(['/books']);
    }

    private reset(){
        console.log("inside the reset():::::::");
        this.book.id = null;
        this.book.title = null;
        this.book.author = null;
        console.log("end of reset():::::::");
    }

    ngOnChanges(changes:any) {
        console.log("calling ngOnChanges()::::::::");
    }

    deleteBook(bookId: string){
        console.log("Inside the deleteBook()::::Book id::::"+bookId);
        this._bookService.deleteBook(bookId)
            .subscribe((response) => {console.log(response); this.getBooks();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteBook():::::::");
    }

    getBook(bookId: string){
        console.log("Inside the updateBook()::::::Book id::::"+bookId);
        this._bookService.getBookById(bookId)
            .subscribe((bookData) => {this.book = bookData; this.getBooks(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();    
        console.log("end of updateBook()::::::");
    }
}