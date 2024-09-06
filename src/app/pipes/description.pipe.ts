import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string,numberOfWords:number): string {
    return value.split(' ').slice(0,numberOfWords).join(' ');
  }

}
