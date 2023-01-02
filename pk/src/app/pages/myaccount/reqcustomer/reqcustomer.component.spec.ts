import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcustomerComponent } from './reqcustomer.component';

describe('ReqcustomerComponent', () => {
  let component: ReqcustomerComponent;
  let fixture: ComponentFixture<ReqcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
