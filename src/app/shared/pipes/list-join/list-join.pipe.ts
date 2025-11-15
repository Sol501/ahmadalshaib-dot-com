import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listJoin',
  standalone: true
})
export class ListJoinPipe implements PipeTransform {
  transform(values: readonly string[] | null | undefined, separator = ', '): string {
    if (!values?.length) {
      return '';
    }

    return values.join(separator);
  }
}
