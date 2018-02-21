import { Component, OnInit, Input} from '@angular/core';

import { InstructorHttpService } from '../../../instructorHTTP.service';

@Component({
  selector: 'app-student-past-sessions',
  templateUrl: './student-past-sessions.component.html',
  styleUrls: ['./student-past-sessions.component.css']
})
export class StudentPastSessionsComponent implements OnInit {

  @Input() student: Object;

  @Input() studentSessions: any = [];
  constructor(private  instructorHttpService: InstructorHttpService) { }

  ngOnInit() {

  }

}
