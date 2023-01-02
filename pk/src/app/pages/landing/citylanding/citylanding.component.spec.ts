import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitylandingComponent } from './citylanding.component';

describe('CitylandingComponent', () => {
  let component: CitylandingComponent;
  let fixture: ComponentFixture<CitylandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitylandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitylandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
