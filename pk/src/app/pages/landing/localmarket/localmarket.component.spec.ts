import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalmarketComponent } from './localmarket.component';

describe('LocalmarketComponent', () => {
  let component: LocalmarketComponent;
  let fixture: ComponentFixture<LocalmarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalmarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
