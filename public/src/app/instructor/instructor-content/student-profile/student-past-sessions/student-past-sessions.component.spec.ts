import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPastSessionsComponent } from './student-past-sessions.component';

describe('StudentPastSessionsComponent', () => {
  let component: StudentPastSessionsComponent;
  let fixture: ComponentFixture<StudentPastSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPastSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPastSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
