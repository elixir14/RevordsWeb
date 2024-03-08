import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SpinWheelService } from "./SpinWheelConfigurationService";

@Injectable()
export class DataService {
  businessID: string;
  _defaultOpts = [
    //   "1 pt",
    //   "2 pt",
    //   "1 pt",
    //   "2 pt",
    //   "10 pt",
    //   "2 pt",
    //   "1 pt",
    //   "3 pt",
    //   "5 pt",
    //   "1 pt",
    //   "5 pt",
    //   "3 pt"
  ];

  optionSource: BehaviorSubject<String[]>;
  option$: any;

  winnersSource: BehaviorSubject<String[]>;
  winner$: Observable<String[]>;

  constructor(private _spinwheel: SpinWheelService) {
    this.optionSource = new BehaviorSubject(this.getOptions());
    this.option$ = this.optionSource.asObservable();

    this.winnersSource = new BehaviorSubject([]);
    this.winner$ = this.winnersSource.asObservable();
  }

  addNewOption(value) {
    const currentOpts = [...this.optionSource.getValue()];
    currentOpts.push(value);
    this.optionSource.next(currentOpts);
    this.persistOptions();
  }

  updateOption() {
    const currentOpts = this.optionSource.getValue();
    this.optionSource.next(currentOpts.filter((data:any, i) => {
      return true;
    }));
    this.persistOptions();
  }

  deleteNewOption(array, index) {
    const currentOpts = this.optionSource.getValue();
    this.optionSource.next(currentOpts.filter((data: any, i) => this.applyFilter(index, i)));
    this.persistOptions();
  }

  applyFilter(index, i) {
    if (index != i) {
      return true;
    } else {
      return false;
    }
  }

  addWinner(value) {
    let winners = this.winnersSource.getValue();
    winners = [...winners, value];
    this.winnersSource.next(winners);
  }

  restartWinners() {
    this.winnersSource.next([]);
  }

  persistOptions() {
    localStorage.setItem("OPTS", JSON.stringify(this.optionSource.getValue()));
  }

  getOptions(): String[] {
    const value = localStorage.getItem("OPTS");
    return value ? JSON.parse(value) : this._defaultOpts;
  }

  resetToDefault() {
    const value = localStorage.getItem("OPTS");
    this.optionSource.next(value ? JSON.parse(value) : this._defaultOpts);
  }
}
