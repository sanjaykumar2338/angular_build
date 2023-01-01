import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryresponseComponent } from './enquiryresponse.component';

describe('EnquiryresponseComponent', () => {
  let component: EnquiryresponseComponent;
  let fixture: ComponentFixture<EnquiryresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
