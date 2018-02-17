import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorControlSidebarComponent } from './instructor-control-sidebar.component';

describe('StarterControlSidebarComponent', () => {
  let component: InstructorControlSidebarComponent;
  let fixture: ComponentFixture<InstructorControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
