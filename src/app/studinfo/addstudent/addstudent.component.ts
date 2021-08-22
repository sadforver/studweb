import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from './type';
import { SharedService } from 'src/app/shared.service';
import { studentList } from '../student';
import { ValidateStudentExist } from 'src/app/validators/asyncStudentId.validator';
import { Observable, Subject } from 'rxjs';
import { Result } from 'src/app/result';
import { debounceTime, distinctUntilChanged, exhaustMap } from 'rxjs/operators';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddstudentComponent implements OnInit {
  @Input() dataItem: studentList;
  @Input() method: string;
  isDisable: boolean = true;
  validateForm: FormGroup;
  add: boolean = false;
  update: boolean = false;
  public showLoading = false;
  gender = 'F';
  studentType = 'M';
  valid: boolean;
  private submitForm$ = new Subject<studentList>();
  private updateForm$ = new Subject<studentList>();
  submitresult$: Observable<Result<studentList>>;
  updateresult$: Observable<Result<studentList>>;
  addsubmit(value: studentList) {
    this.showLoading = true;
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    setTimeout(() => {
      console.log(this.validateForm.valid);
      if (this.validateForm.valid) {
        this.showLoading = false;
        this.submitForm$.next(value);
      } else {
        this.showLoading = false;
      }
    }, 2000);
  }
  updatesubmit(value: studentList) {
    this.showLoading = true;
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    setTimeout(() => {
      if (this.validateForm.valid) {
        this.showLoading = false;
        this.updateForm$.next(value);
      } else {
        this.showLoading = false;
      }
    }, 2000);
  }

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email',
    },
  };
  a: number = 0;

  close() {
    this.modalRef.destroy();
  }
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    const { required, maxLength, minLength, email, mobile, idNo } =
      MyValidators;
    this.validateForm = this.fb.group({
      studentId: [
        '',
        [required, maxLength(12), minLength(12)],
        ValidateStudentExist.createValidator(this.sharedService),
      ],
      studentName: ['', [required]],
      gender: ['F', [required]],
      schoolYear: ['2021-01-01', [required]],
      telephone: ['', [required, mobile]],
      email: ['', [required, email]],
      studentType: ['M', [required]],
      idNo: ['', [required, maxLength(18), minLength(18), idNo]],
      avatarUrl: ['', []],
    });
  }
  ngOnInit(): void {
    this.validateForm.setValue(this.dataItem);
    console.log(this.method);
    if (this.method == 'add') {
      this.add = true;
      this.update = false;
    } else {
      this.add = false;
      this.update = true;
      this.validateForm.controls['studentId'].clearAsyncValidators();
    }

    this.submitresult$ = this.submitForm$.pipe(
      exhaustMap((value) => this.sharedService.addStudent(value))
    );

    this.submitresult$.subscribe({
      next: (res) => {
        alert(res.message.toString());
        this.modalRef.destroy('suc');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
    this.updateresult$ = this.updateForm$.pipe(
      exhaustMap((value) => this.sharedService.updateStudent(value))
    );
    this.updateresult$.subscribe({
      next: (res) => {
        alert(res.message.toString());
        this.modalRef.destroy('suc');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
