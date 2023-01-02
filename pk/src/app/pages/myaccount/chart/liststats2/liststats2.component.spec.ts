import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Liststats2Component } from './liststats2.component';

describe('Liststats2Component', () => {
  let component: Liststats2Component;
  let fixture: ComponentFixture<Liststats2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Liststats2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Liststats2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
