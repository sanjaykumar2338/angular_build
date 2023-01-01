import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelfrmComponent } from './funnelfrm.component';

describe('FunnelfrmComponent', () => {
  let component: FunnelfrmComponent;
  let fixture: ComponentFixture<FunnelfrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelfrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelfrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
