import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitsComponent } from './howits.component';

describe('HowitsComponent', () => {
  let component: HowitsComponent;
  let fixture: ComponentFixture<HowitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
