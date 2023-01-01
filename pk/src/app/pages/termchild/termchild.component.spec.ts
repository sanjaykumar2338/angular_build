import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermchildComponent } from './termchild.component';

describe('TermchildComponent', () => {
  let component: TermchildComponent;
  let fixture: ComponentFixture<TermchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
