import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
// import { DataService } from '../../services/data.service';
const COLORS = ['#f82', '#0bf', '#fb0', '#0fb', '#b0f', '#f0b', '#bf0'];

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() set options(values: any) {
    this.sectors = values.map((opts: any, i: any) => {
      return {
        // color: COLORS[(i >= COLORS.length ? i + 1 : i) % COLORS.length],
        color: opts.colorCode,
        arctext: opts.arctext,
        probality: opts.probability
      };
    });
  }

  @ViewChild('wheel') wheel: ElementRef<HTMLCanvasElement>;
  @ViewChild('spin') spin: ElementRef;
  colors = ['#f82', '#0bf', '#fb0', '#0fb', '#b0f', '#f0b', '#bf0'];
  sectors: any[] = [];
  spinning = true;
  rand = (m: any, M: any) => Math.random() * (M - m) + m;
  tot: any;
  ctx: any;
  dia: any;
  rad: any;
  PI: any;
  TAU: any;
  arc0: any;

  winners = [];

  modeDelete = true;

  friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  lastSelection: any;

  constructor() { }
  ngDoCheck(): void {

  }

  ngOnInit() {
    this.options = JSON.parse(localStorage.getItem("OPTS") || '{}');
  }
  ngAfterViewInit(): void {

  }
}
