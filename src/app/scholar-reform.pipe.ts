import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scholarReform'
})
export class ScholarReformPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch(value){
        case 'M': return '硕士';
        case 'D': return '博士';
        default: return '/';
    } 
  }
}
