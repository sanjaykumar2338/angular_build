import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencecateComponent } from './audiencecate.component';

describe('AudiencecateComponent', () => {
  let component: AudiencecateComponent;
  let fixture: ComponentFixture<AudiencecateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencecateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencecateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
