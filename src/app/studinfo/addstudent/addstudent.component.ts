import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef,NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';
import { MyValidationErrors, MyValidators } from './type';
import { SharedService } from 'src/app/shared.service';
import { studentList } from '../student';
import { Result } from 'src/app/result';
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
  add:boolean;
  update:boolean;
  public showLoading = false;
  gender='F';
  studentType='M';

  addsubmit(value: { studentId: string;studentName:string;gender:string;schoolYear:Date;telephone:string; email: string; studentType: string; idNo: string;}) {
    this.showLoading = true;
    this.a=0;
    for (const key in this.validateForm.controls) {
      
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
      
    }
    
    if (this.validateForm.valid){
    setTimeout(()=>{
      this.showLoading = false;
      this.sharedService.addStudent(value).subscribe(res=>{
        alert(res.message.toString());
      });
      this.modalRef.destroy('suc');
    },1000)}
    else {
      this.showLoading = false;
    }
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
    
    if (this.validateForm.valid){
    setTimeout(()=>{
      this.showLoading = false;
      this.sharedService.updateStudent(value).subscribe(res=>{
        alert(res.message.toString());
      });
      this.modalRef.destroy('suc');
    },1000)}
    else {
      this.showLoading = false;
    }
    
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
  // submitForm(value: { studentId: string;studentName:string;gender:string;schoolYear:Date;telephone:string; email: string; studentType: string; idNo: string;}): void {
    
  //   for (const key in this.validateForm.controls) {
  //     this.a=0;
  //     if (this.validateForm.controls.hasOwnProperty(key)) {
  //       this.validateForm.controls[key].markAsDirty();
  //       this.validateForm.controls[key].updateValueAndValidity();
  //       this.a=this.a+1;
  //     }
  //   }
  //   if (this.a==0){
  //   this.sharedService.addStudent(value).subscribe(res=>{
  //     alert(res.message.toString());
  //   });}
  // }
  close(){
    this.modalRef.destroy()
  }



  constructor(private modalRef: NzModalRef,
              private fb: FormBuilder,
              private sharedService:SharedService,
             ) {
                 // use `MyValidators`
    const { required, maxLength, minLength, email, mobile,idNo } = MyValidators;
    this.validateForm = this.fb.group({
      studentId: ['', [required, maxLength(12), minLength(12)]],
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
    }
  }

}
