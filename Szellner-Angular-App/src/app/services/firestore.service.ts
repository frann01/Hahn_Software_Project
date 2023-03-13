import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { this.getBooks() }

  private booksCollection?: AngularFirestoreCollection<any>;
  public books: any[] = [];

  selectedBook:any=null;

  getBooks()
  {
    this.booksCollection = this.afs.collection<any>('books');
    return this.booksCollection.valueChanges().subscribe(books =>
      {
        this.books=[];
        books.forEach(book => {
          this.books.unshift(book);
        });
      })
  }


}
