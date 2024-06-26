import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueanalysisComponent } from './revenueanalysis.component';

describe('RevenueanalysisComponent', () => {
  let component: RevenueanalysisComponent;
  let fixture: ComponentFixture<RevenueanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueanalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
