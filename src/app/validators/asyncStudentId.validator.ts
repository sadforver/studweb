
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SharedService } from '../shared.service';
export class ValidateStudentExist {
  static createValidator(sharedService: SharedService,add:boolean=true) {
    
    return (control: AbstractControl):
    | Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null>  => {
      const value=control.value;
     console.log(add)
     add=true;
      return new Promise(pass =>{
        setTimeout(() => {
          sharedService.checkStudId(value).subscribe(res => {
            console.log(res)
            if (res.count){
              console.log(res.count)
              if (add){  
                pass({studentId:{ 'zh-cn': `该学号已存在`, en: `Student Id has already existed` }});
                console.log(pass)
              }
              else{
              pass(null);
              }}
            else{
            pass(null);
            } 
          }
        )
        },300);});
      }
     
      
    };}
    

