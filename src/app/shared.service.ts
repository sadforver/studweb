import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { studentList } from './studinfo/student';
import { checkres, Result } from './result';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly apiUrl="http://127.0.0.1:8000"

  constructor(private http:HttpClient) { }
  getStudent():Observable<Result<studentList>>{
    return this.http.get<Result<studentList>>(this.apiUrl+'/stud/');
  }
  addStudent(val:any):Observable<Result<studentList>>{
    return this.http.post<Result<studentList>>(this.apiUrl+'/stud/',val);
  }
  updateStudent(val:any):Observable<Result<studentList>>{
    return this.http.put<Result<studentList>>(this.apiUrl+'/stud/',val);
  }
  deleteStudent(val:any){
    return this.http.delete(this.apiUrl+'/stud/',{
      　　params:{
      　　　　studentId:val,
      　　}
  })}
  getStudents(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{result:Result<studentList>[]}> {
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
    })
    return this.http
      .get<{result:Result<studentList[]>[]}>(`${this.apiUrl+/stud/}`, { params })
      .pipe(catchError(() => of({result: []})));
  }
  checkStudId(studentId:any):Observable<checkres>{
    return this.http
      .get<checkres>(this.apiUrl+'/vali/',{params:{studentId:studentId,}})}
  }

