import { FirestoreService } from './../services/firestore.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Output() BookToBeDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() BookToBeDownloaded: EventEmitter<any> = new EventEmitter<any>();
  @Input() books:any[];


  constructor(public firestore : FirestoreService, public router:Router ) { }

  ngOnInit(): void {
  }

  deleteBook(Book : any)
  {
    this.BookToBeDeleted?.emit(Book)
  }

  downloadBook(Book : any)
  {
    this.BookToBeDownloaded?.emit(Book)
  }

  routeModify(book :any)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Id": book.key
      }
    };
    this.firestore.selectedBook=book;
    this.router.navigate(["modifyBook"], navigationExtras);

  }
}
