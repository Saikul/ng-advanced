import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private goals = new BehaviorSubject<any>(['Hi Mi One', 'HI MI TWO']);
  goal = this.goals.asObservable();

  constructor() {}

  ChangeGoal(goal) {
    this.goals.next(goal);
  }
}
