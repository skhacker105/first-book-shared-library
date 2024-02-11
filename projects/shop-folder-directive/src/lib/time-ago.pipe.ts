import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date | number): Observable<string> {
    return interval(30000).pipe(map(() => this.getFormatedValue(value)));
  }

  getFormatedValue(value: string | Date | number) {
    const currentTime: Date = new Date();
    const timestamp: Date = new Date(value);
    const timeDiff: number = Math.abs(currentTime.getTime() - timestamp.getTime());
    const seconds: number = Math.floor(timeDiff / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);
    const isSameYear = timestamp.getFullYear() === currentTime.getFullYear();
    const isSameMonth = isSameYear && timestamp.getMonth() === currentTime.getMonth();
    let result = '';

    if (!isSameYear)
      result = `${timestamp.getDate()} ${timestamp.toLocaleDateString('en-US', { month: 'short' })}, ${timestamp.getFullYear()}`;

    else if (!isSameMonth || days >= 1)
      result = `${timestamp.getDate()} ${timestamp.toLocaleDateString('en-US', { month: 'short' })}`;

    else if (hours >= 1)
      result = `${timestamp.toLocaleTimeString('en-US', { hour12: true, hour: "2-digit", minute: "2-digit" })}`;

    else if (minutes > 0)
      result = `${minutes} min${minutes > 1 ? 's' : ''} ago`;

    else if (seconds > 0)
      result = `${seconds} sec${seconds > 1 ? 's' : ''} ago`;

    else result = 'Just Now';

    return result;
  }

}
