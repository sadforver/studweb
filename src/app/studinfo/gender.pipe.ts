import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value === 'F') {
      return '女';
    } else {
      return '男';
    }
  }
}
