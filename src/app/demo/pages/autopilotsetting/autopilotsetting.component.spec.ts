import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopilotsettingComponent } from './autopilotsetting.component';

describe('AutopilotsettingComponent', () => {
  let component: AutopilotsettingComponent;
  let fixture: ComponentFixture<AutopilotsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutopilotsettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutopilotsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
