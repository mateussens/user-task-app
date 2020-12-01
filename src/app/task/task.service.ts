import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Subject} from "rxjs/Rx";
import {ApiService} from "../services/api.service";
import {TaskFilter} from "./task.model";

@Injectable()
export class TaskService {

  public taskUrl = '/tasks/';
  public taskUrlPk = '/tasks/{pk}/';

  private _onTaskChange: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(private apiService: ApiService) {
    this._onTaskChange = new Subject<any>();
  }

  fetch(filter?: TaskFilter): Observable<any[] | any> {
    const url = this.apiService.translateUrl(this.taskUrl, {});
    return this.apiService.get<any[]>(url, filter);
  }

  save(data: any): Observable<any> {
    const url = this.apiService.translateUrl(this.taskUrl, {});
    return this.apiService.post<any>(url, data);
  }

  update(scheduling: string, data: any): Observable<any> {
    const url = this.apiService.translateUrl(this.taskUrlPk, {pk: scheduling});
    return this.apiService.put<any>(url, data);
  }

  remove(bank: string): Observable<void> {
    const url = this.apiService.translateUrl(this.taskUrlPk, {pk: bank});
    return this.apiService.delete(url);
  }

  patch(task: string, data: any): Observable<any> {
    const url = this.apiService.translateUrl(this.taskUrlPk, {pk: task});
    return this.apiService.patch<any>(url, data);
  }

  subOnChangeTask(): Observable<any> {
    return this._onTaskChange.asObservable();
  }


  onChangeTask(): void {
    this._onTaskChange.next();
  }

}
