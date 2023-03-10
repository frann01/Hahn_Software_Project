import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http:HttpClient) { }


  ngOnInit(): void {
  }

  DeleteBook($event:any)
  {
    console.log($event)
    let book : any = $event
    this.http.delete('https://localhost:7246/api/Books/'+book.key)
    .subscribe((res)=>{
      console.log(res)
    });
  }

}
