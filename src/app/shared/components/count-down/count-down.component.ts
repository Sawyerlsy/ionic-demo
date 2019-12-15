import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

/**
 * 倒计时组件
 */
@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountDownComponent implements OnInit {
  /**
   * 默认为纯数字
   */
  @Input() mode = 'number';
  @Input() start: any;
  @Input() end: any;

  /**
   * 倒计时结束后,通知父组件
   */
  @Output() finally = new EventEmitter();

  private _MS_PER_SECOND = 1000;

  countDown$: Observable<string>;

  constructor() { }

  ngOnInit() {
    // TODO: 循环开始前应显示默认值,否则会出现空白
    if (this.mode === 'date') {
      this.countDown$ = this.getCountDownObservableByDate(
        this.start ? this.start : new Date(),
        this.end ? this.end : new Date()
      );
    } else {
      this.countDown$ = this.getCountDownObservableByNumber(
        this.start ? this.start : 0,
        this.end ? this.end : 0
      );
    }
  }

  private getCountDownObservableByDate(startDate: Date, futureDate: Date) {
    return interval(1000).pipe(
      map(elapse => this.diffInSec(startDate, futureDate) - elapse),
      takeWhile(gap => {
        if (gap < 0) {
          this.coutDownEnd();
        }
        return gap >= 0;
      }),
      map(sec => ({
        day: Math.floor(sec / 3600 / 24),
        hour: Math.floor((sec / 3600) % 24),
        minute: Math.floor((sec / 60) % 60),
        second: Math.floor(sec % 60)
      })),
      map(({ hour, minute, second }) => `${hour}:${minute}:${second}`)
    );
  }

  private getCountDownObservableByNumber(startNumber: number, futureNumber: number) {
    return interval(1000).pipe(
      map(elapse => startNumber - futureNumber - elapse),
      takeWhile(gap => {
        if (gap < futureNumber) {
          this.coutDownEnd();
        }
        return gap >= futureNumber;
      }),
      map(sec => ({
        second: sec
      })),
      map(({ second }) => `${second}`)
    );
  }

  private diffInSec = (start: Date, future: Date): number => {
    const diff = future.getTime() - start.getTime();
    return Math.floor(diff / this._MS_PER_SECOND);
  }

  private coutDownEnd() {
    this.finally.emit(true);
  }
}
