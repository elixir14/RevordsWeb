import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";

// A service that keeps track of current items and prizes
@Injectable()
export class ItemService {

    _defaultOpts = [
        "Diego",
        "Ignacio",
        "JaviGo",
        "Mendi",
        "Sergio",
        "Virginia",
        "Tod@s"
      ];
    
      optionSource: BehaviorSubject<String[]>;
      option$;
    
      winnersSource: BehaviorSubject<String[]>;
      winner$: Observable<String[]>;
    
      constructor() {
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
    
      deleteNewOption(value) {
        const currentOpts = this.optionSource.getValue();
        this.optionSource.next(currentOpts.filter(opts => opts != value));
        this.persistOptions();
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
        this.optionSource.next(this._defaultOpts);
      }

}