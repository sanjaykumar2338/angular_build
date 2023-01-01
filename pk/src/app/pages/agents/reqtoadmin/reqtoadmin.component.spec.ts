import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqtoadminComponent } from './reqtoadmin.component';

describe('ReqtoadminComponent', () => {
  let component: ReqtoadminComponent;
  let fixture: ComponentFixture<ReqtoadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqtoadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqtoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
