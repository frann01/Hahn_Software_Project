import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
{path:"", component:MainComponent},
{path:"addBook", component:AddBookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
