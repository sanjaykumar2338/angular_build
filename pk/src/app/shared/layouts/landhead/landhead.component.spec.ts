import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandheadComponent } from './landhead.component';

describe('LandheadComponent', () => {
  let component: LandheadComponent;
  let fixture: ComponentFixture<LandheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
