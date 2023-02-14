import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITask} from "../interfaces/task.interface";
import {Subject} from "rxjs";
import {ActionEnum} from "../enums/action.enum";

@Injectable()
export class TodolistService {
  public selectedTask: ITask;
  public taskAction$ = new Subject<ActionEnum>();
  constructor(private _httpClient: HttpClient) { }

  getAll(q?: string){
    return this._httpClient.get<ITask[]>(`http://apit.deepin.ir/tasks?q=${q}`);
  }

  addTask(param: ITask){
    return this._httpClient.post<ITask[]>(`http://apit.deepin.ir/tasks`, param);
  }
  updateTask(id: number,param: ITask){
    return this._httpClient.put<any>(`http://apit.deepin.ir/tasks/${id}`, param);
  }
  deleteTask(id: number){
    return this._httpClient.delete<any>(`http://apit.deepin.ir/tasks/${id}`);
  }

  clearAllTask(){
    return this._httpClient.delete(`http://apit.deepin.ir/tasks/clear-all`);
  }
}
