import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { filter } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { studentList } from './student';


@Component({
  selector: 'app-studinfo',
  templateUrl: './studinfo.component.html',
  styleUrls: ['./studinfo.component.scss']
})
export class StudinfoComponent implements OnInit {
  students: studentList[];
  oriStudents: studentList[];
  searchTerm: string = '';
  studentId:string='';
  loading = true;
  total=1;
  pageIndex = 1;
  pageSize = 10;
  filterGender = [
    { text: '男', value: 'M' },
    { text: '女', value: 'F' },
  ];
  filterScholar = [
    { text: '博士', value: 'D' },
    { text: '硕士', value: 'M' },
  ];
  idSortOrder = null;
  idSortDirections = ['ascend', 'descend', null];
  yearSortOrder = null;
  yearSortDirections = ['ascend', 'descend', null];


  constructor(private sharedService:SharedService,
              private modal: NzModalService,) { }
  

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    searchTerm:string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.sharedService.getStudents(pageIndex, pageSize, sortField, sortOrder,searchTerm, filter).subscribe(res => {
      this.loading = false;
      this.total =res['count'];
      this.students = res['data'];
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    const searchTerm=this.searchTerm ||null;
    this.pageIndex=pageIndex;
    this.pageSize=pageSize;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder,searchTerm, filter);
  }

  ngOnInit(): void {
   this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,null, []);
  }
  onSend(searchTerm: string){
    this.searchTerm=searchTerm;
    this.pageIndex=1;
    console.log(searchTerm)
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,this.searchTerm, []);
  }

  deleteStud(dataItem:studentList){
    this.sharedService.deleteStudent(dataItem.studentId).subscribe(res=>{
      alert(res['message'].toString())
      if (res['code']==1000){
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,this.searchTerm, []);
      }
    })
  }

  creatForm(): void {  
    const modal = this.modal.create({
      nzTitle: 'Add New Student',
      nzContent: AddstudentComponent,
      nzComponentParams: {
        dataItem:{ studentId: '',
        studentName: '',
        gender:'F',
        schoolYear:new Date(),
        telephone:'',
        email: '',
        studentType: 'M',
        idNo:'',
        },
        method:'add',
      },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe( res => {
      console.log('afterClose-res: ', res);
      if(res){
        console.log('更新数据啦');
        console.log(res)
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,this.searchTerm, []);
      }       
    })
  }
  updateForm(dataItem: studentList): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Student Information',
      nzContent:  AddstudentComponent,
      nzComponentParams: {
        dataItem:dataItem,
        method:'update'
      },
      nzClosable: false,
      nzFooter:null
    });
    modal.afterClose.subscribe( res => {
      console.log('afterClose-res: ', res);
      if(res){
        console.log('更新数据啦');
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null,this.searchTerm, []);
      } 
    })
  }
}
