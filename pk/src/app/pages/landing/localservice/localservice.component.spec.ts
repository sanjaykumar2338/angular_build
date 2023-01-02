import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LocalserviceComponent } from "./localservice.component";

describe("LocalserviceComponent", () => {
  let component: LocalserviceComponent;
  let fixture: ComponentFixture<LocalserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocalserviceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
