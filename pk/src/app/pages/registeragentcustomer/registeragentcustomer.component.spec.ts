import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteragentcustomerComponent } from './registeragentcustomer.component';

describe('RegisteragentcustomerComponent', () => {
  let component: RegisteragentcustomerComponent;
  let fixture: ComponentFixture<RegisteragentcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteragentcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteragentcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
