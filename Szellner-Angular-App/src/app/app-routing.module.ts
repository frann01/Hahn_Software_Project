import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ModifyBookComponent } from './modify-book/modify-book.component';


const routes: Routes = [
{path:"", component:MainComponent},
{path:"addBook", component:AddBookComponent},
{path:"modifyBook", component:ModifyBookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
