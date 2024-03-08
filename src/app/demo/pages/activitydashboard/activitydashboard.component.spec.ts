import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitydashboardComponent } from './activitydashboard.component';

describe('ActivitydashboardComponent', () => {
  let component: ActivitydashboardComponent;
  let fixture: ComponentFixture<ActivitydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitydashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
