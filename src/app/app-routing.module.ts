import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path:'', component: LayoutComponent, children: [
      {path: '', component: TodoListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
