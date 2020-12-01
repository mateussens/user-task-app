import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {User, UserFilter, UserResponse} from "./user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UserTemplateComponent} from "./parts/user/user.template.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'action'];

  page = 1;
  per_page = 10;
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {read: true}) paginator!: MatPaginator;
  resultsLength!: number;
  filterData!: UserFilter;

  constructor(private _userService: UserService,
              private _toast: ToastrService,
              private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>([]);
    this.filterData = new UserFilter();
  }

  ngOnInit(): void {
    this.fetch();

    this._userService.subOnChangeUser().subscribe(() => {
      this.fetch();
    });
  }

  private fetch(): void {
    this.subUsers().subscribe(response => {
      this.dataSource.data = response.results!;
      this.resultsLength = response.count!;
    });
  }

  private subUsers(): Observable<UserResponse> {
    return this._userService.fetch(this.filterData);
  }

  changePage(event: any): void {
    this.filterData.page = event.pageIndex + 1;
    this.filterData.per_page = event.pageSize;
    this.fetch();
  }

  onEdit(user: User): void {
    this.openDialog(user);
  }

  onNew(event: any): void {
    this.openDialog();
  }

  private openDialog(user?: User): void {
    this._dialog.open(UserTemplateComponent, {data: user || {}});
  }

  onRemove(user: string): void {
    this._userService.remove(user).subscribe(response => {
      this._toast.success('Usuário removido com sucesso!!');
      this.fetch();
    }, error => {
      this._toast.error('Ops! Ocorreu um erro ao tentar excluir o Usuário.');
    });
  }

}
