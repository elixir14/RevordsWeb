import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexttojoinComponent } from './texttojoin.component';

describe('TexttojoinComponent', () => {
  let component: TexttojoinComponent;
  let fixture: ComponentFixture<TexttojoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TexttojoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexttojoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
