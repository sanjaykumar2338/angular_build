import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionallComponent } from './regionall.component';

describe('RegionallComponent', () => {
  let component: RegionallComponent;
  let fixture: ComponentFixture<RegionallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
