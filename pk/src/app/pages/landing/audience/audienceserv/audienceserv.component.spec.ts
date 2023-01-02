import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceservComponent } from './audienceserv.component';

describe('AudienceservComponent', () => {
  let component: AudienceservComponent;
  let fixture: ComponentFixture<AudienceservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
