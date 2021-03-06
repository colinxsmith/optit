import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  url = environment.serverUrl;
  getData(key = 'results') {
    return this
      .http
      .get<any>(`${this.url}/db`) // Use map from rxjs and .pipe() to choose the route. In json-server /db gives all routes
      .pipe(map(ddd => key === '' ? ddd : ddd[key]));
  }
  postResult() {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this
      .http
      .post<{
        name: string, id: number,
        movies: number
      }>(`${this.url}/results`, { id: 6, name: 'Colin', movies: 0 }, options)
      .pipe(map(ddd => {
        console.log(ddd);
        return ddd;
      }));
  }
  postType(n: number = 20, type: string = 'short', factorWant: number[] = []) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this
      .http
      .post<{
        n: number,
        type: string,
        factorWant: number[]
      }>(`${this.url}/optype`, { n, type, factorWant}, options)
      .pipe(map(ddd => {
        console.log(ddd);
        return ddd;
      }));
  }
  putResult(key = 'results', id = 6) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this
      .http
      .put<{
        name: string, id: number,
        movies: number
      }>(`${this.url}/${key}/${id}`, { id, name: 'Colin', movies: Math.floor(Math.random() * 200) }, options)
      .pipe(map(ddd => {
        console.log(ddd);
        return ddd;
      }));
  }
}
