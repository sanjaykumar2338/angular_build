import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceservicesComponent } from './audienceservices.component';

describe('AudienceservicesComponent', () => {
  let component: AudienceservicesComponent;
  let fixture: ComponentFixture<AudienceservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
