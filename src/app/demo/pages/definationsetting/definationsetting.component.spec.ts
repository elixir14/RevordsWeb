import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinationsettingComponent } from './definationsetting.component';

describe('DefinationsettingComponent', () => {
  let component: DefinationsettingComponent;
  let fixture: ComponentFixture<DefinationsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinationsettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinationsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
