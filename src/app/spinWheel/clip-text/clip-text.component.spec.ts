import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipTextComponent } from './clip-text.component';

describe('ClipTextComponent', () => {
  let component: ClipTextComponent;
  let fixture: ComponentFixture<ClipTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
