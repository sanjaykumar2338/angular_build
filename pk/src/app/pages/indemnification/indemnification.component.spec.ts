import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemnificationComponent } from './indemnification.component';

describe('IndemnificationComponent', () => {
  let component: IndemnificationComponent;
  let fixture: ComponentFixture<IndemnificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndemnificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndemnificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
