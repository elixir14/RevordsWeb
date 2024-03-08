import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignreachComponent } from './campaignreach.component';

describe('CampaignreachComponent', () => {
  let component: CampaignreachComponent;
  let fixture: ComponentFixture<CampaignreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignreachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
