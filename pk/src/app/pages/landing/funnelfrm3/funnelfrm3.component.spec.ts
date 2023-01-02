import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Funnelfrm3Component } from './funnelfrm3.component';

describe('Funnelfrm3Component', () => {
  let component: Funnelfrm3Component;
  let fixture: ComponentFixture<Funnelfrm3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Funnelfrm3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Funnelfrm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
