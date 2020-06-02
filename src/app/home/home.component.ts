import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { DataService } from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('*=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.6s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({
                  opacity: 1,
                  transform: 'translateY(0)',
                  offset: 1
                })
              ])
            )
          ]),
          { optional: true }
        ),
        query(
          ':leave',
          stagger('300ms', [
            animate(
              '.6s ease-in',
              keyframes([
                style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({
                  opacity: 0,
                  transform: 'translateY(-75%)',
                  offset: 1
                })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount;
  employeeName: string = 'saikul';
  addTextItem: string = 'Add Items';
  goalText: string = 'my goals in life';
  goals = [];
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => (this.goals = res));
    this._data.ChangeGoal(this.goals);
  }
  addItemFun() {
    if (!this.goalText) {
      return false;
    }
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.ChangeGoal(this.goals);
  }
  removeItems(i) {
    this.goals.splice(i, 1);
    this._data.ChangeGoal(this.goals);
  }
}
