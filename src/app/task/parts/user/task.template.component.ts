import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../../task.service";
import {Task} from "../../task.model";
import {Observable, of} from "rxjs";
import {debounceTime, map, switchMap} from "rxjs/operators";
import {User, UserResponse} from "../../../user/user.model";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'task-template',
  templateUrl: './task.template.component.html',
  styleUrls: ['./task.template.component.scss']
})

export class TaskTemplateComponent implements OnInit {

  user!: FormControl;
  filteredOptions!: Observable<any>;
  task!: Task;
  taskForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<TaskTemplateComponent>,
              private _formBuilder: FormBuilder,
              private _taskService: TaskService,
              private _toast: ToastrService,
              private _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = data ? data : new Task();
    this.user = new FormControl();
  }

  ngOnInit(): void {
    this.taskForm = this.createTaskForm();

    this.filteredOptions = this.user.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        return value ? this.subUsers(value) : of({results: []});
      }),
      map(response => {
        return response.results;
      })
    );
  }

  private subUsers(value: string): Observable<UserResponse> {
    const data = Object.assign({name: value});
    return this._userService.fetch(data);
  }

  save(): void {
    if (!this.taskForm.valid) {
      this.openSnackBarError('Preencha todos os campos obrigatórios!!');
      return;
    }

    const data = this.taskForm.getRawValue();
    data['user'] = data.user.id;
    const sub = this.task.id ? this._taskService.update(this.task.id, data) : this._taskService.save(data);
    sub.subscribe(data => {
        this.openSnackBarSuccess('Tarefa cadastrada com sucesso!!');
        this._taskService.onChangeTask();
        this.dialogRef.close(data);
      },
      error => {
        this.openSnackBarError('Erro ao casdastrar tarefa!!');
      }
    );
  }

  createTaskForm(): FormGroup {
    return this._formBuilder.group({
      description: [this.task.description, Validators.required],
      user: [this.task.user?.id, Validators.required],
    });
  }

  openSnackBarError(message: string): void {
    this._toast.error(message);
  }

  openSnackBarSuccess(message: string): void {
    this._toast.success(message);
  }

  displayFn(user: any): string {
    if (!user) return ''
    return typeof user === 'string' ? user : user.name;
  }
}
