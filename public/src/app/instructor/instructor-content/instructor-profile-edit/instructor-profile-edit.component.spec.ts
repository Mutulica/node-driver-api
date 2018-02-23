import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileEditComponent } from './instructor-profile-edit.component';

describe('InstructorProfileEditComponent', () => {
  let component: InstructorProfileEditComponent;
  let fixture: ComponentFixture<InstructorProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
