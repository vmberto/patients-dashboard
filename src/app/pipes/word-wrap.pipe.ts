import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordWrap'
})
export class WordWrapPipe implements PipeTransform {

  transform(value: string): any {
    let newValue;

    if (typeof value !== 'string') {
      newValue = value;
    } else if (value.length > 15) {
      newValue = `${value.substring(0, 15)}...`;
    } else {
      newValue = value;
    }

    return newValue;

  }

}
