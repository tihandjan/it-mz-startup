import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length > args[0]) {
      return value.substring(0, args[0]) + '...'
    }
    return value;
  }

}
