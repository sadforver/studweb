import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
export class ValidateStudentExist {
  static createValidator(sharedService: SharedService) {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const value = control.value;
      return new Promise((pass) => {
        setTimeout(() => {
          sharedService.checkStudId(value).subscribe((res) => {
            console.log(res);
            if (res.count) {
              console.log(res.count);
              pass({
                studentId: {
                  'zh-cn': `该学号已存在`,
                  en: `Student Id has already existed`,
                },
              });
              console.log(pass);
            } else {
              pass(null);
            }
          });
        }, 300);
      });
    };
  }
}
