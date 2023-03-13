import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    pages: ['', [Validators.required, Validators.min(1)]],
    yearofpublication: ['',[ Validators.required, Validators.min(1)]],
    genre: ['', Validators.required],
    description: ['', Validators.required],
    language: ['', [Validators.required, Validators.maxLength(30)]],
    publishinghouse: ['', Validators.required],
  });
  loading$ = this.loader.loading$;

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    public loader: LoadingService,
    private snackbar : MatSnackBar
  ) {}

  OnSubmitBook(Book:any)
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched
      console.log(this.form.errors)
    }
    else
    {
      this.loader.show()
      this.http.post('https://localhost:7246/api/Books', Book)
      .subscribe((res)=>{
        this.loader.hide()
        this.snackbar.open('Book added succesfully', 'OK');
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
  }

}
