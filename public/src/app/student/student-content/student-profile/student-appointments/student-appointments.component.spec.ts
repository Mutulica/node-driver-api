import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointmentsComponent } from './student-appointments.component';

describe('StudentAppointmentsComponent', () => {
  let component: StudentAppointmentsComponent;
  let fixture: ComponentFixture<StudentAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
