import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstatsComponent } from './liststats.component';

describe('ListstatsComponent', () => {
  let component: ListstatsComponent;
  let fixture: ComponentFixture<ListstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
