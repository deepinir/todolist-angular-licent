import {Component, OnInit} from '@angular/core';
import {TodolistService} from "../shared/services/todolist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateEnum} from "../shared/enums/state.enum";
import {ActionEnum} from "../shared/enums/action.enum";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  public qParam = StateEnum.ALL;
  public stateEnum = StateEnum;

  constructor(private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _todoListService: TodolistService) {
  }

  ngOnInit(): void {
    this._activateRoute.queryParams.subscribe((queryParams: any) => {
      this.qParam = queryParams.q;
    });
  }

  public clearAllTask() {
    this._todoListService.taskAction$.next(ActionEnum.CLEAR_ALL)
  }

  public changeState(state: StateEnum) {
    switch (state) {
      case StateEnum.ALL:
        this._router.navigate([], {queryParams: {q: state}});
        break
      case StateEnum.PENDING:
        this._router.navigate([], {queryParams: {q: state}});
        break
      case StateEnum.COMPLETED:
        this._router.navigate([], {queryParams: {q: state}});
    }
  }
}
