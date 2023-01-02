import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpromoComponent } from './editpromo.component';

describe('EditpromoComponent', () => {
  let component: EditpromoComponent;
  let fixture: ComponentFixture<EditpromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
