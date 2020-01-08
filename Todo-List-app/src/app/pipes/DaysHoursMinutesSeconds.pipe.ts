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

    if (tmpTime > 0 && minutes === 0 && hour === 0 && day === 0) {
      return tmpTime + ' Sekund';
    } else if (tmpTime > 0 && minutes > 0 && hour === 0 && day === 0) {
        return minutes + ' Minuty - ' + tmpTime + ' Sekund';
    } else if (tmpTime > 0 && minutes > 0 && hour > 0 && day === 0) {
        return hour + ' Godzin - ' + minutes + ' Minuty - ' + tmpTime + ' Sekund';
    } else if (tmpTime > 0 && minutes > 0 && hour > 0 && day > 0) {
        return day + ' Dni - ' + hour + ' Godzin - ' + minutes + ' Minuty - ' + tmpTime + ' Sekund';
    }
  }
  
}
