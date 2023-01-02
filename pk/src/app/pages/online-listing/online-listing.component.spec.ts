import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineListingComponent } from './online-listing.component';

describe('OnlineListingComponent', () => {
  let component: OnlineListingComponent;
  let fixture: ComponentFixture<OnlineListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
