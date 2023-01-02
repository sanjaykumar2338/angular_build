import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncancelComponent } from './incancel.component';

describe('IncancelComponent', () => {
  let component: IncancelComponent;
  let fixture: ComponentFixture<IncancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
