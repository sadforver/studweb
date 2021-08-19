import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { SharedService } from '../shared.service';

export class ValidateStudentExist {
  static createValidator(sharedService: SharedService) {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return new Promise((pass) => {
        const count = control.valueChanges.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap((value) => sharedService.checkStudId(value)),
          map(({ count }) => count)
        );
        count.subscribe((count) => {
          if (count) {
            console.log(count);
            pass({
              studentId: {
                'zh-cn': `该学号已存在`,
                en: `Student Id has already existed`,
              },
            });
          } else {
            pass(null);
          }
        });
      });
    };
  }
}
