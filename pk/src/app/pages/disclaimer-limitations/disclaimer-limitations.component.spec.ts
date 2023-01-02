import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerLimitationsComponent } from './disclaimer-limitations.component';

describe('DisclaimerLimitationsComponent', () => {
  let component: DisclaimerLimitationsComponent;
  let fixture: ComponentFixture<DisclaimerLimitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclaimerLimitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerLimitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
