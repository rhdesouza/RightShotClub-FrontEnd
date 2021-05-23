import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length == 11)
      return value.replace(/(\d{2})(\d{5})(\d{4})/g, '(\$1) \$2 \$3');

    if (value.length == 10)
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, '(\$1) \$2 \$3');

    return value;
  }

}
