import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeftNavComponent } from './student-left-nav.component';

describe('StudentLeftNavComponent', () => {
  let component: StudentLeftNavComponent;
  let fixture: ComponentFixture<StudentLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
