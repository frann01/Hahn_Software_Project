import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirestoreService } from './../services/firestore.service';

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
    pages: ['', Validators.required],
    yearofpublication: ['', Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required],
    language: ['', Validators.required],
    publishinghouse: ['', Validators.required],
  });

  book:any=null;

  constructor(
    public firestore : FirestoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http:HttpClient
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
      console.log(Book)
      this.http.put('https://localhost:7246/api/Books/'+Book.key, Book)
      .subscribe((res)=>{
        console.log(res)
      });
    }
    
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.book = params['book'];
    });
  }


}
