import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayfreeSuccessComponent } from './payfree-success.component';

describe('PayfreeSuccessComponent', () => {
  let component: PayfreeSuccessComponent;
  let fixture: ComponentFixture<PayfreeSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayfreeSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayfreeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
