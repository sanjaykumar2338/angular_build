import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinersComponent } from './joiners.component';

describe('JoinersComponent', () => {
  let component: JoinersComponent;
  let fixture: ComponentFixture<JoinersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
