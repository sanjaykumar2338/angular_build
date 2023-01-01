import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteragentComponent } from './registeragent.component';

describe('RegisteragentComponent', () => {
  let component: RegisteragentComponent;
  let fixture: ComponentFixture<RegisteragentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteragentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteragentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
