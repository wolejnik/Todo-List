import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DaysHoursMinutesSeconds'
})
export class DaysHoursMinutesSeconds implements PipeTransform {

  transform(value: number): string {

    let tmpTime = value;
    const day = Math.floor(tmpTime / (3600 * 24));
    tmpTime -= day * 3600 * 24;
    const hour = Math.floor(tmpTime / 3600);
    tmpTime -= hour * 3600;
    const minutes = Math.floor(tmpTime / 60);
    tmpTime -= minutes * 60;

    return day + ' Days - ' + hour + ' Hors - ' + minutes + ' Minutes - ' + tmpTime + ' Seconds';
  }

}
