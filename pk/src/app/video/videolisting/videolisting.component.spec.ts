import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideolistingComponent } from './videolisting.component';

describe('VideolistingComponent', () => {
  let component: VideolistingComponent;
  let fixture: ComponentFixture<VideolistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideolistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideolistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
