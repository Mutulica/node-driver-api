import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUnconfirmedComponent } from './schedule-unconfirmed.component';

describe('ScheduleUnconfirmedComponent', () => {
  let component: ScheduleUnconfirmedComponent;
  let fixture: ComponentFixture<ScheduleUnconfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleUnconfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleUnconfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
