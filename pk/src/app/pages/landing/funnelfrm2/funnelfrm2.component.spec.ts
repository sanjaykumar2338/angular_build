import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Funnelfrm2Component } from './funnelfrm2.component';

describe('Funnelfrm2Component', () => {
  let component: Funnelfrm2Component;
  let fixture: ComponentFixture<Funnelfrm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Funnelfrm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Funnelfrm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
