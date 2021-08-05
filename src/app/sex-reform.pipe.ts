import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexReform'
})
export class SexReformPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch(value){
        case 'M': return '男';
        case 'F': return '女';
        default: return '/';
    } 
}

}
