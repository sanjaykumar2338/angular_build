import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbusinessComponent } from './allbusiness.component';

describe('AllbusinessComponent', () => {
  let component: AllbusinessComponent;
  let fixture: ComponentFixture<AllbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
