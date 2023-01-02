import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentprofeditComponent } from './agentprofedit.component';

describe('AgentprofeditComponent', () => {
  let component: AgentprofeditComponent;
  let fixture: ComponentFixture<AgentprofeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentprofeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentprofeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
