import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ncm'
})
export class NcmPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length == 8)
      return value.replace(/(\d{4})(\d{2})(\d{2})/g, '\$1.\$2.\$3');
    
      return value;
  }

}
