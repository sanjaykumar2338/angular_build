import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesubcateComponent } from './audiencesubcate.component';

describe('AudiencesubcateComponent', () => {
  let component: AudiencesubcateComponent;
  let fixture: ComponentFixture<AudiencesubcateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencesubcateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesubcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
