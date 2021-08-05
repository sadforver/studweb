import {  studentList } from '../studinfo/student';
import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable,of } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { catchError } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { StudentListService } from 'src/app/student-list.service';
import { Result } from 'src/app/result'; 
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {
  constructor(private service:SharedService,
              private modal: NzModalService,
              private studentListService: StudentListService,
              ) { }

  searchTerm:string;
  oriStudents:studentList[]=[];
  listOfStudents: studentList[] = [];
  genderFilter = [
        { text: '男', value: 'M' },
        { text: '女', value: 'F' },
      ];
  genderFilterfn = (list: string[], item: studentList) => list.some((gender) => item.gender.indexOf(gender) !== -1);
  typeFilter = [
          { text: '博士', value: 'D' },
          { text: '硕士', value: 'M' },
        ];
  typeFilterfn = (list: string[], item: studentList) => list.some((type) => item.studentType.indexOf(type) !== -1);
  idSortOrder = null;
  idSortFn = (a: studentList, b: studentList) => a.studentId.localeCompare(b.studentId);
  idSortDirections = ['ascend', 'descend', null];
  yearSortOrder = null;
  yearSortFn = (a: studentList, b: studentList) => String(a.schoolYear).localeCompare(String(b.schoolYear));
  yearSortDirections = ['ascend', 'descend', null];
  

  ngOnInit(): void {
    this.studentListService.getStudents().subscribe((result) => {
            this.oriStudents = result.data;
            this.listOfStudents = result.data;
          });
  }
  searchInfo(){
    this.listOfStudents =this.oriStudents.filter((stud:studentList)=>{
      if (stud.studentId.indexOf(this.searchTerm)>= 0) {
        return true;  
      } else {
        if (stud.studentName.indexOf(this.searchTerm)>= 0){
          return true;
        } else {
          return false;
        }
      }
    })
  }
  


}