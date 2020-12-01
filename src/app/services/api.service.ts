import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import * as moment from "moment";
import * as _ from "lodash";
import {Injectable} from "@angular/core";

export const LoadingInterceptorSkipHeader = 'X-Skip-Loading-Interceptor';

@Injectable({providedIn: 'root'})
export class ApiService {

  API_URL = `${environment.apiUrl}`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(protected http: HttpClient) {

  }

  public get<T>(path: string, params?: any): Observable<T> {
    const options = this.defineOptions(params);
    return this.http.get<T>(`${this.API_URL}${path}`, options);
  }

  public post<T>(path: string, data: any, params?: any): Observable<T> {
    const options = this.defineOptions(params);
    const body = JSON.stringify(data);
    return this.http.post<T>(`${this.API_URL}${path}`, body, options);
  }

  public put<T>(path: string, data: any, params?: any): Observable<T> {
    const options = this.defineOptions(params);
    const body = JSON.stringify(data);
    return this.http.put<T>(`${this.API_URL}${path}`, body, options);
  }

  public delete<T>(path: string, params?: any, ignoreLoadingInterceptor?: boolean): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}${path}`);
  }

  public patch<T>(path: string, data: any, params?: any, ignoreLoadingInterceptor?: boolean, observeResponse = false): Observable<T> {
    const body = JSON.stringify(data);
    const options = this.defineOptions(params);
    return this.http.patch<T>(`${this.API_URL}${path}`, body, options);
  }

  public serializeParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) httpParams = httpParams.append(key, params[key]);
      });
    }
    return httpParams;
  }

  private defineOptions(params?: any): {} {
    const options = {'headers': this.headers, 'params': this.serializeParams(params)};
    return options;
  }

  /**
   * monta url com parametros
   * ex:
   * params = {'idFarm': 1}
   * url = 'farm/{idFram}'
   * translateUrl(url, params) = 'farm/1';
   */
  public translateUrl(url: string, params: any): string {
    if (!params) {
      return '';
    }
    _.templateSettings.interpolate = /{([\s\S]+?)}/g;
    for (const key of Object.keys(params)) {
      const value = params[key];
      if (value instanceof Date) {
        params[key] = moment(value).format('YYYY-MM-DD');
      }
    }
    return _.template(url)(params);
  }
}
