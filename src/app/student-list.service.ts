import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { studentList } from './studinfo/student';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  studentListUrl = 'http://127.0.0.1:8000/user/';

  getStudent(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable< Result<studentList[]> > {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      if(filter.value){
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });}
    });
    return this.http
      .get<Result<studentList[]> >(`${this.studentListUrl}`, { params })
     
  }






  getStudents( ): Observable<Result<studentList[]>> {
    return this.http.get<Result<studentList[]>>(this.studentListUrl);
     
  }
  constructor(private http: HttpClient) {}
}
