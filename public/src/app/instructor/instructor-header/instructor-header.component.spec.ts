import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorHeaderComponent } from './instructor-header.component';

describe('StarterHeaderComponent', () => {
  let component: InstructorHeaderComponent;
  let fixture: ComponentFixture<InstructorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
