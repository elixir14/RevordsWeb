import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsettingComponent } from './rewardsetting.component';

describe('RewardsettingComponent', () => {
  let component: RewardsettingComponent;
  let fixture: ComponentFixture<RewardsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
