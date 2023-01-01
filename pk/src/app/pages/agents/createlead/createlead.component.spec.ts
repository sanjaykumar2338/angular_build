import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateleadComponent } from './createlead.component';

describe('CreateleadComponent', () => {
  let component: CreateleadComponent;
  let fixture: ComponentFixture<CreateleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
