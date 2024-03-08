import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  option$: Observable<String[]>;
  newDeveloper: String;
  public color1: string = '#2889e9';
  totalPoints: any = 0;
  indexwiseCharacters: { index: number, length: number }[] = []
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.option$ = this.dataService.option$;
    let array: any = this.dataService.getOptions();
    this.countCharacterLength(array);
    this.dataService.option$.forEach(element => {
      element.forEach(element1 => {
        let pnt = element1.probability
        this.totalPoints += parseInt(pnt)
      });
    });
  }

  countCharacterLength(array) {
    let length = array.length;
    for (let i = 0; i < length; i++) {
      this.indexwiseCharacters.push({
        index: i,
        length: 15 - array[i].arctext.length
      })
    }
  }

  deleteOpt(option: any, index: any) {
    this.dataService.deleteNewOption(option, index);
    let array: any = this.dataService.getOptions();
    this.countCharacterLength(array);
  }

  addNewDeveloper() {
    let length = this.dataService.getOptions().length;
    this.indexwiseCharacters.push({
      index: length,
      length: 15
    });
    let option: { arctext: string, colorCode: string, indexID: number, probability: number, IsPoints: boolean } =
      { arctext: '', colorCode: '#ff8822', indexID: length, probability: null, IsPoints: false };
    this.dataService.addNewOption(option);
  }
  numberOnly(event, IsPoints): boolean {
    if (IsPoints) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
  }
  onEventLog(controlName, data: any, index: any): void {

    if (controlName == "arcText") {
      this.indexwiseCharacters[index].length = 15 - data.srcElement.value.length;
    }
    if (controlName == "IsPoints") {
      this.dataService.option$.forEach(element => {
        if (element[index].IsPoints) {
          if (isNaN(Number(element[index].arctext))) {
            element[index].arctext = '';
          }
        }
      });
    }
    this.dataService.updateOption();
    this.totalPoints = 0;
    this.dataService.option$.forEach(element => {
      element.forEach(element1 => {
        let pnt = element1.probability
        this.totalPoints += parseInt(pnt)
      });
    });
  }
}
