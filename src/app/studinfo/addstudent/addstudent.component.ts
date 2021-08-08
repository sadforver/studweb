import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef,NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';
import {  MyValidationErrors, MyValidators } from './type';
import { SharedService } from 'src/app/shared.service';
import { studentList } from '../student';
import { Result } from 'src/app/result';
import { ValidateStudentExist } from 'src/app/validators/asyncStudentId.validator';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  @Input()dataItem:studentList;
  @Input()method:string;
  isDisable:boolean=true;
  validateForm: FormGroup;
  add:boolean=false;
  update:boolean=false;
  public showLoading = false;
  gender='F';
  studentType='M';
  valid:boolean;
  addsubmit(value: { studentId: string;studentName:string;gender:string;schoolYear:Date;telephone:string; email: string; studentType: string; idNo: string;}) {
    this.showLoading = true;
    this.a=0;

    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    setTimeout(()=>{
      console.log(this.validateForm.valid)
      if (this.validateForm.valid){
      this.showLoading = false;
      this.sharedService.addStudent(value).subscribe(res=>{
        alert(res.message.toString());
      });
      this.modalRef.destroy('suc');
    }else {
      this.showLoading = false;
    }},1000)
    
  }
  updatesubmit(value: { studentId: string;studentName:string;gender:string;schoolYear:Date;telephone:string; email: string; studentType: string; idNo: string;}) {
    this.showLoading = true;
    this.a=0;
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      } 
    }
    setTimeout(()=>{
    if (this.validateForm.valid){
      this.showLoading = false;
      this.sharedService.updateStudent(value).subscribe(res=>{
        alert(res.message.toString());
      });
      this.modalRef.destroy('suc');
    }
    else {
      this.showLoading = false;
    }},1000)
    
  }
  
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };
  a:number=0;

  close(){
    this.modalRef.destroy()
  }
  constructor(private modalRef: NzModalRef,
              private fb: FormBuilder,
              private sharedService:SharedService,
             ) {
    const { required, maxLength, minLength, email, mobile,idNo} = MyValidators;
    this.validateForm = this.fb.group({
      studentId: ['', [required, maxLength(12), minLength(12)],ValidateStudentExist.createValidator(this.sharedService,this.add)],
      studentName: ['', [required]],
      gender:['F',[required]],
      schoolYear:['2021-01-01',[required]],
      telephone:['',[required,mobile]],
      email: ['', [required, email]],
      studentType: ['M', [required]],
      idNo:['',[required, maxLength(18), minLength(18),idNo]],

    });
  } 
  ngOnInit(): void {
    this.validateForm.setValue(this.dataItem)
    
    console.log(this.method)
    if( this.method=="add"){
      this.add=true;
      this.update=false;
    }
    else{
      this.add=false;
      this.update=true;
      this.validateForm.controls['studentId'].clearAsyncValidators()
      // this.validateForm.controls['studentId'].setValidators([MyValidators.required, MyValidators.maxLength(12), MyValidators.minLength(12)])
    }
    
    
    
  }
  
}
