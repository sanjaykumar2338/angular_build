import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerdetailComponent } from './ownerdetail.component';

describe('OwnerdetailComponent', () => {
  let component: OwnerdetailComponent;
  let fixture: ComponentFixture<OwnerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
