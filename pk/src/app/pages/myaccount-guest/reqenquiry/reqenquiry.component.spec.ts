import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqenquiryComponent } from './reqenquiry.component';

describe('ReqenquiryComponent', () => {
  let component: ReqenquiryComponent;
  let fixture: ComponentFixture<ReqenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
