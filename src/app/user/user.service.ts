import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Subject} from "rxjs/Rx";
import {ApiService} from "../services/api.service";
import {UserFilter} from "./user.model";

@Injectable()
export class UserService {

  public userUrl = '/users/';
  public userUrlPk = '/users/{pk}/';

  private _onUserChange: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(private apiService: ApiService) {
    this._onUserChange = new Subject<any>();
  }

  fetch(filter?: UserFilter): Observable<any[] | any> {
    const url = this.apiService.translateUrl(this.userUrl, {});
    return this.apiService.get<any[]>(url, filter);
  }

  save(data: any): Observable<any> {
    const url = this.apiService.translateUrl(this.userUrl, {});
    return this.apiService.post<any>(url, data);
  }

  update(scheduling: string, data: any): Observable<any> {
    const url = this.apiService.translateUrl(this.userUrlPk, {pk: scheduling});
    return this.apiService.put<any>(url, data);
  }

  remove(bank: string): Observable<void> {
    const url = this.apiService.translateUrl(this.userUrlPk, {pk: bank});
    return this.apiService.delete(url);
  }

  subOnChangeUser(): Observable<any> {
    return this._onUserChange.asObservable();
  }


  onChangeUser(): void {
    this._onUserChange.next();
  }

}
