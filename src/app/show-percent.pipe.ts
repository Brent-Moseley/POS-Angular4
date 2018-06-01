import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPercent'
})
export class ShowPercentPipe implements PipeTransform {

  transform(value: any): string {
    return value > 0 ? value + '%' : 'None';
  }
}
