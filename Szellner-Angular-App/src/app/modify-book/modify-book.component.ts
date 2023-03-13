import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirestoreService } from './../services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent implements OnInit {

  
  form = this.fb.group({
    key: ['', Validators.required],
    title: ['', Validators.required],
    author: ['', Validators.required],
    pages: ['', Validators.required, Validators.min(1)],
    yearofpublication: ['', Validators.required, Validators.min(1)],
    genre: ['', Validators.required],
    description: ['', Validators.required],
    language: ['', Validators.required, Validators.maxLength(30)],
    publishinghouse: ['', Validators.required],
  });

  book:any=null;
  loading$ = this.loader.loading$;

  constructor(
    public firestore : FirestoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http:HttpClient,
    public loader: LoadingService,
    private snackbar : MatSnackBar
  ) 
  {
    this.route.queryParams.subscribe(params => {
      this.book = params["Id"];
     }); 
    if(this.firestore.selectedBook != null)
    {
      this.form.patchValue(this.firestore.selectedBook);
    }
  }

  OnSubmitBook(Book:any)
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched
    }
    else
    {
      this.loader.show()
      console.log(Book)
      this.http.put('https://localhost:7246/api/Books/'+ Book.key, Book)
      .subscribe((res)=>{
        this.loader.hide()
        this.snackbar.open('Book Modified succesfully', 'OK');
        console.log(res)
      },
      err => {
        this.loader.hide()
        this.snackbar.open('An error ocurred', 'DISMISS');
        console.log(err)
      });
    }
    
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.book = params['book'];
    });
  }


}
