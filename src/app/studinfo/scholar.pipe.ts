import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scholar'
})
export class ScholarPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value==='D'){
      return "博士";
    }
    else{
      return "硕士";
    }
  }


}
