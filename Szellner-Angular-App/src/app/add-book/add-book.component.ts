import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    pages: ['', Validators.required],
    yearofpublication: ['', Validators.required],
    genres: ['', Validators.required],
    description: ['', Validators.required],
    language: ['', Validators.required],
    publishinghouse: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http:HttpClient
  ) {}

  OnSubmitBook(Book:any)
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched()
    }
    else
    {
      console.log(Book)
      this.http.post('https://localhost:7246/api/Books', Book)
      .subscribe((res)=>{
        console.log(res)
      });
    }
    
  }

  ngOnInit(): void {
  }

}
