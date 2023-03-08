import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { this.getBooks() }

  private booksCollection?: AngularFirestoreCollection<any>;
  public books: any[] = [];

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
