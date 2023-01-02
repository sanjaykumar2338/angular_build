import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsettingComponent } from './listsetting.component';

describe('ListsettingComponent', () => {
  let component: ListsettingComponent;
  let fixture: ComponentFixture<ListsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
