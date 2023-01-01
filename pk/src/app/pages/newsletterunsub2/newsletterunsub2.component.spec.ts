import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newsletterunsub2Component } from './newsletterunsub2.component';

describe('Newsletterunsub2Component', () => {
  let component: Newsletterunsub2Component;
  let fixture: ComponentFixture<Newsletterunsub2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newsletterunsub2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newsletterunsub2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
