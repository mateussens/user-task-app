import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Task, TaskFilter, TaskResponse} from "./task.model";
import {MatPaginator} from "@angular/material/paginator";
import {TaskService} from "./task.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {TaskTemplateComponent} from "./parts/user/task.template.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['user', 'description', 'status', 'action'];

  page = 1;
  per_page = 10;
  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatPaginator, {read: true}) paginator!: MatPaginator;
  resultsLength!: number;
  filterData!: TaskFilter;

  constructor(private _taskService: TaskService,
              private _toast: ToastrService,
              private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Task>([]);
    this.filterData = new TaskFilter();
  }

  ngOnInit(): void {
    this.fetch();

    this._taskService.subOnChangeTask().subscribe(() => {
      this.fetch();
    });
  }

  private fetch(): void {
    this.subTasks().subscribe(response => {
      this.dataSource.data = response.results!;
      this.resultsLength = response.count!;
    });
  }

  private subTasks(): Observable<TaskResponse> {
    return this._taskService.fetch(this.filterData);
  }

  changePage(event: any): void {
    this.filterData.page = event.pageIndex + 1;
    this.filterData.per_page = event.pageSize;
    this.fetch();
  }

  onEdit(user: Task): void {
    this.openDialog(user);
  }

  onNew(event: any): void {
    this.openDialog();
  }

  private openDialog(user?: Task): void {
    this._dialog.open(TaskTemplateComponent, {data: user || {}});
  }

  onRemove(user: string): void {
    this._taskService.remove(user).subscribe(response => {
      this._toast.success('Tarefa removida com sucesso!!');
      this.fetch();
    }, error => {
      this._toast.error('Ops! Ocorreu um erro ao tentar excluir o Tarefa.');
    });
  }

  updateStatus(task: string, status: boolean): void {
    this._taskService.patch(task, {'is_open': status}).subscribe(response => {
      this._toast.success('Tarefa atualizada');
      this.fetch();
    }, error => {
      this._toast.error('Ops! Ocorreu um erro ao tentar atualizar a tarefa.');
    });
  }
}
