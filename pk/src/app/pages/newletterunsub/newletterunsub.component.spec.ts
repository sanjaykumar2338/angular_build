import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewletterunsubComponent } from './newletterunsub.component';

describe('NewletterunsubComponent', () => {
  let component: NewletterunsubComponent;
  let fixture: ComponentFixture<NewletterunsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewletterunsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewletterunsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
