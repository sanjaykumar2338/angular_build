import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchstatsComponent } from './searchstats.component';

describe('SearchstatsComponent', () => {
  let component: SearchstatsComponent;
  let fixture: ComponentFixture<SearchstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
