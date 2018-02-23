import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorContentComponent } from './instructor-content.component';

describe('StarterContentComponent', () => {
  let component: InstructorContentComponent;
  let fixture: ComponentFixture<InstructorContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
