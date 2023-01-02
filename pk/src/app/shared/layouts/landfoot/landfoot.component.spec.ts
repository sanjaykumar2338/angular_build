import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfootComponent } from './landfoot.component';

describe('LandfootComponent', () => {
  let component: LandfootComponent;
  let fixture: ComponentFixture<LandfootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandfootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandfootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
