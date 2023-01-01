import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycancelComponent } from './paycancel.component';

describe('PaycancelComponent', () => {
  let component: PaycancelComponent;
  let fixture: ComponentFixture<PaycancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaycancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
