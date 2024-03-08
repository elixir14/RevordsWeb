import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDefinitionComponent } from './tag-definition.component';

describe('TagDefinitionComponent', () => {
  let component: TagDefinitionComponent;
  let fixture: ComponentFixture<TagDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
