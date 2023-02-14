import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TodolistService} from "../shared/services/todolist.service";
import {ITask} from "../shared/interfaces/task.interface";
import {ActionEnum} from "../shared/enums/action.enum";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  public toggleSettings = false;
  public actionEnum = ActionEnum;
  @Input() task: ITask;
  @ViewChild('menu') menu: ElementRef;
  constructor(private _renderer: Renderer2,
              private _todoListService: TodolistService) {
    this._renderer.listen('window', 'click',(e:Event)=>{
      if(e.target!==this.menu.nativeElement){
        this.toggleSettings=false;
      }
    });
  }

  ngOnInit(): void {
  }

  public checked() {
    this.changeTaskState(this.actionEnum.COMPLETED);
  }
  public changeTaskState( action: ActionEnum, event?: any){
    this._todoListService.selectedTask = this.task;
    this._todoListService.taskAction$.next(action);
  }

}
