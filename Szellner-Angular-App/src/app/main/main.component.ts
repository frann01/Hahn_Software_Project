import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from "file-saver";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http:HttpClient,
    public loader: LoadingService,
    private firestore :FirestoreService,
    private snackbar : MatSnackBar) {this.FilteredBooks = this.firestore.books}
  loading$ = this.loader.loading$;

  searchParam :string;
  FilteredBooks:any[];

  selectedBook={ "description": "", "yearofpublication": 1953, "title": "Fahrenheit 451", "key": "Hh7wAW8IrcCwDAZeS4zV", "language": "Spanish", "genre": "Fiction/Novel", "author": "Ray Bradbury", "publishinghouse": "P&J", "pages": 183 }

  ngOnInit(): void {
    this.loader.show()
    setTimeout(() => {
      this.FilteredBooks = this.firestore.books
      this.loader.hide()
    }, 2000);

  }

  DownloadBook($event:any)
  {
    let book : any = $event
    this.selectedBook = book;
    saveAs(new Blob([JSON.stringify(book, null, 2)], { type: 'JSON' }), book.title + '.json')
  }

  DownloadCollection()
  {
    saveAs(new Blob([JSON.stringify(this.firestore.books, null, 2)], { type: 'JSON' }), 'BookCollection.json')
  }
  

  DeleteBook($event:any)
  {
    console.log($event)
    this.loader.show()
    let book : any = $event
    this.http.delete('http://mybookcollection.somee.com/api/Books/'+book.key)
    .subscribe((res)=>{
      this.loader.hide()
      this.snackbar.open('Book deleted succesfully', 'OK');
      console.log(res)
    });
  }

  
  hacerBusqueda() {

    console.log(this.firestore.books)

    if (this.searchParam === "") {
      this.FilteredBooks = this.firestore.books;
      return;
    }

    const serachParamLower = this.searchParam.toLowerCase();
    this.FilteredBooks = this.firestore.books.filter(book => this.doSearch(book, serachParamLower));
  }

  doSearch(value : any, searcher:string) {
    if (typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'object') {
      for (let fieldKey in value) {
        if (!this.estaEnLaListaNegraDeKeys(fieldKey) && this.doSearch(value[fieldKey], searcher)) {
          return true;
        }
      }

      return false;
    }


    return (typeof value == "string" ? value.toLocaleLowerCase() : value.toString()).includes(searcher)
  }

  estaEnLaListaNegraDeKeys(key : any) {
    return ["description", "key"].indexOf(key) != -1
  }


}
