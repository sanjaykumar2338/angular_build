import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestdashboardComponent } from './guestdashboard.component';

describe('GuestdashboardComponent', () => {
  let component: GuestdashboardComponent;
  let fixture: ComponentFixture<GuestdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
