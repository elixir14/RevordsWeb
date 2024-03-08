import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSubscribeEmailComponent } from './unsubscribeEmail.component';

describe('UnSubscribeEmailComponent', () => {
  let component: UnSubscribeEmailComponent;
  let fixture: ComponentFixture<UnSubscribeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnSubscribeEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnSubscribeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
