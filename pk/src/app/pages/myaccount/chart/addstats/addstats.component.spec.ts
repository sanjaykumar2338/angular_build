import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstatsComponent } from './addstats.component';

describe('AddstatsComponent', () => {
  let component: AddstatsComponent;
  let fixture: ComponentFixture<AddstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
