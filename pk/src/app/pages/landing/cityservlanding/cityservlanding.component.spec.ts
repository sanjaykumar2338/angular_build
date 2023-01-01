import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityservlandingComponent } from './cityservlanding.component';

describe('CityservlandingComponent', () => {
  let component: CityservlandingComponent;
  let fixture: ComponentFixture<CityservlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityservlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityservlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
