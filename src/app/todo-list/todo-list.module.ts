import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { TaskComponent } from './task/task.component';
import {SharedModule} from "../shared/shared.module";
import {TodolistService} from "./shared/services/todolist.service";
import { ControlsComponent } from './controls/controls.component';



@NgModule({
  declarations: [
    TodoListComponent,
    TaskComponent,
    ControlsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [TodoListComponent],
  providers: [TodolistService]
})
export class TodoListModule { }
