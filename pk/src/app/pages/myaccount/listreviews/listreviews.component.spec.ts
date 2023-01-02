import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreviewsComponent } from './listreviews.component';

describe('ListreviewsComponent', () => {
  let component: ListreviewsComponent;
  let fixture: ComponentFixture<ListreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
