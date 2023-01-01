import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenewComponent } from './homenew.component';

describe('HomenewComponent', () => {
  let component: HomenewComponent;
  let fixture: ComponentFixture<HomenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
