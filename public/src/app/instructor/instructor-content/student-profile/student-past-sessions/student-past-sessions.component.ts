import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { InstructorHttpService } from '../../../instructorHTTP.service';
import { UtilsService } from '../../../../shared/utils/utils.service';

@Component({
  selector: 'app-student-past-sessions',
  templateUrl: './student-past-sessions.component.html',
  styleUrls: ['./student-past-sessions.component.css']
})
export class StudentPastSessionsComponent implements OnInit {

  @Input() student: Object;

  studentSessions: any = [];

  private studentId = this.route.snapshot.params['id'];

  constructor(
    private instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.instructorHttpService.getStudentCompletedAppointments(this.studentId)
    .subscribe(
      (res) => {
          this.studentSessions = res.sort(this.utilsService.orderDateDesc).filter((el) => {
          return el['status'] === 'completed';
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
