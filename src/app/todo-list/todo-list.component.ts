import {Component, OnInit} from '@angular/core';
import {ITask} from "./shared/interfaces/task.interface";
import {TodolistService} from "./shared/services/todolist.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionEnum} from "./shared/enums/action.enum";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public tasks: ITask[];
  public actionEnum = ActionEnum;
  public taskAction: ActionEnum | null;
  public isEdit = false;
  public form: FormGroup;
  private _filter: any;
  private _params: any;

  constructor(private _fb: FormBuilder,
              private _activateRoute: ActivatedRoute,
              private _todoListService: TodolistService) {
  }

  ngOnInit(): void {
    this._createForm();
    this._activateRoute.queryParams.subscribe((queryParams: any) => {
      this._filter = queryParams.q
      this._getAllTask()
    });

    this._todoListService.taskAction$.subscribe((action: ActionEnum) => this._checkNewAction(action));


    this.form.controls['description'].valueChanges.subscribe(value => {
      if(!value) {
        this.isEdit = false;
      }
    });
  }


  public doSubmit() {
    if (this.form.valid && this.form.dirty) {
      this._todoListService.addTask(this.form.value).subscribe(res => {
        this._getAllTask();
      })
    }
  }

  private _checkNewAction(action: ActionEnum) {
    this.taskAction = action;
    switch (action) {
      case ActionEnum.COMPLETED:
        this.updateTask();
        break;
      case ActionEnum.EDIT: {
        this.isEdit = true;
        this.form.patchValue({
          description: this._todoListService.selectedTask.description,
          completed: this._todoListService.selectedTask.completed,
          id: this._todoListService.selectedTask.id
        })
      }
        break;
      case ActionEnum.DELETE:
        this._deletedTask();
        break;
      case ActionEnum.CLEAR_ALL:
        this._clearAll();
        break;
    }
  }

  public updateTask() {
    if(this.taskAction === this.actionEnum.EDIT) {
      this._params = {id: this._todoListService.selectedTask.id, description: this.form.value.description};
    } else if(this.taskAction === this.actionEnum.COMPLETED)  {
      this._params = {id: this._todoListService.selectedTask.id, completed: !this._todoListService.selectedTask.completed};
    }

    this._todoListService.updateTask(this._todoListService.selectedTask.id, this._params).subscribe(res => {
      this._getAllTask();
    });
  }


  private _deletedTask() {
    this._todoListService.deleteTask(this._todoListService.selectedTask.id).subscribe(res => {
      this._getAllTask();
    });
  }

  private _clearAll() {
    this._todoListService.clearAllTask().subscribe(res => {
      this._getAllTask();
    });
  }

  private _createForm() {
    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      completed: new FormControl(false),
      id: new FormControl(null)
    });
  }

  private _getAllTask() {
    this._todoListService.getAll(this._filter).subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
    });
  }
}
