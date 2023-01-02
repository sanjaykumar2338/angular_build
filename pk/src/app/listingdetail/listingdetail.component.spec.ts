import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingdetailComponent } from './listingdetail.component';

describe('ListingdetailComponent', () => {
  let component: ListingdetailComponent;
  let fixture: ComponentFixture<ListingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
