import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfrmComponent } from './loginfrm.component';

describe('LoginfrmComponent', () => {
  let component: LoginfrmComponent;
  let fixture: ComponentFixture<LoginfrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
