import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacychildComponent } from './privacychild.component';

describe('PrivacychildComponent', () => {
  let component: PrivacychildComponent;
  let fixture: ComponentFixture<PrivacychildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacychildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacychildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
