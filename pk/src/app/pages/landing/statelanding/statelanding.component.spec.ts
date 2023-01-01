import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatelandingComponent } from './statelanding.component';

describe('StatelandingComponent', () => {
  let component: StatelandingComponent;
  let fixture: ComponentFixture<StatelandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatelandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatelandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
