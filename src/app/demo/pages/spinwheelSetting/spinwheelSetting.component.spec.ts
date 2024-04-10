import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinwheelSettingComponent } from './spinwheelSetting.component';

describe('SpinwheelSettingComponent', () => {
  let component: SpinwheelSettingComponent;
  let fixture: ComponentFixture<SpinwheelSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinwheelSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinwheelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
