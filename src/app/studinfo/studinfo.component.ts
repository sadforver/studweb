import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { studentList } from './student';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Result } from '../result';

@Component({
  selector: 'app-studinfo',
  templateUrl: './studinfo.component.html',
  styleUrls: ['./studinfo.component.scss'],
})
export class StudinfoComponent implements OnInit {
  students: [studentList[]];
  students$: Observable<studentList[]>;
  result$: Observable<Result<studentList[]>>;
  private searchTerm$ = new Subject<string | null>();
  oriStudents: studentList[];
  studentId: string = '';
  sortField: string | null;
  sortOrder: string | null;
  searchTerm: string | null;
  filter: Array<{ key: string; value: string }>;
  loading = true;
  total = 1;
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

  ploading = false;
  avatarUrl?: string;

  idSortOrder = null;
  idSortDirections = ['ascend', 'descend', null];
  yearSortOrder = null;
  yearSortDirections = ['ascend', 'descend', null];

  constructor(
    private sharedService: SharedService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {}

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    searchTerm: string | null,
    filter: Array<{ key: string; value: string }>
  ): void {
    this.loading = true;
    this.sharedService
      .getStudent(pageIndex, pageSize, sortField, sortOrder, searchTerm, filter)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.total = res.count;
          this.students = res.data;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    const searchTerm = this.searchTerm || null;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.searchTerm = searchTerm;
    this.filter = filter;
    this.loadDataFromServer(
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      searchTerm,
      filter
    );
  }

  ngOnInit(): void {
    this.loadDataFromServer(
      this.pageIndex,
      this.pageSize,
      null,
      null,
      null,
      []
    );
    this.result$ = this.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) =>
        this.sharedService.getStudent(
          this.pageIndex,
          this.pageSize,
          this.sortField,
          this.sortOrder,
          searchTerm,
          this.filter
        )
      )
    );
    this.result$.subscribe({
      next: (res) => {
        this.loading = false;
        this.total = res.count;
        this.students = res.data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  onSend(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
    console.log(this.searchTerm$);
    this.searchTerm = searchTerm;
    this.pageIndex = 1;
    console.log(searchTerm);
  }

  deleteStud(dataItem: studentList) {
    this.sharedService.deleteStudent(dataItem.studentId).subscribe((res) => {
      alert(res['message'].toString());
      if (res['code'] == 1000) {
        this.loadDataFromServer(
          this.pageIndex,
          this.pageSize,
          null,
          null,
          this.searchTerm,
          []
        );
      }
    });
  }

  creatForm(): void {
    const modal = this.modal.create({
      nzTitle: 'Add New Student',
      nzContent: AddstudentComponent,
      nzComponentParams: {
        dataItem: {
          studentId: '',
          studentName: '',
          gender: 'F',
          schoolYear: new Date(),
          telephone: '',
          email: '',
          studentType: 'M',
          idNo: '',
        },
        method: 'add',
      },
      nzClosable: false,
      nzFooter: null,
    });
    modal.afterClose.subscribe((res) => {
      console.log('afterClose-res: ', res);
      if (res) {
        console.log('更新数据啦');
        console.log(res);
        this.loadDataFromServer(
          this.pageIndex,
          this.pageSize,
          null,
          null,
          this.searchTerm,
          []
        );
      }
    });
  }
  updateForm(dataItem: studentList): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Student Information',
      nzContent: AddstudentComponent,
      nzComponentParams: {
        dataItem: dataItem,
        method: 'update',
      },
      nzClosable: false,
      nzFooter: null,
    });
    modal.afterClose.subscribe((res) => {
      console.log('afterClose-res: ', res);
      if (res) {
        console.log('更新数据啦');
        this.loadDataFromServer(
          this.pageIndex,
          this.pageSize,
          null,
          null,
          this.searchTerm,
          []
        );
      }
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  phoBelong = (dataItem: studentList) => {
    return {
      studentId: dataItem.studentId,
    };
  };
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          console.log(img);
          this.loadDataFromServer(
            this.pageIndex,
            this.pageSize,
            null,
            null,
            this.searchTerm,
            []
          );
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
