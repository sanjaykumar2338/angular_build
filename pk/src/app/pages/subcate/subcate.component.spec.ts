import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcateComponent } from './subcate.component';

describe('SubcateComponent', () => {
  let component: SubcateComponent;
  let fixture: ComponentFixture<SubcateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
