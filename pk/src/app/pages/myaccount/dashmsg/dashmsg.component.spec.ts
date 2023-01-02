import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashmsgComponent } from './dashmsg.component';

describe('DashmsgComponent', () => {
  let component: DashmsgComponent;
  let fixture: ComponentFixture<DashmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
