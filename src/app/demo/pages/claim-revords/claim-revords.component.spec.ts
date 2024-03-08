import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRevordsComponent } from './claim-revords.component';

describe('ClaimRevordsComponent', () => {
  let component: ClaimRevordsComponent;
  let fixture: ComponentFixture<ClaimRevordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimRevordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimRevordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
