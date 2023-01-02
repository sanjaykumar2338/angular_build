import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsidebarComponent } from './termsidebar.component';

describe('TermsidebarComponent', () => {
  let component: TermsidebarComponent;
  let fixture: ComponentFixture<TermsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
