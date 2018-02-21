import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLeftNavComponent } from './instructor-left-nav.component';

describe('StarterLeftSideComponent', () => {
  let component: InstructorLeftNavComponent;
  let fixture: ComponentFixture<InstructorLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
