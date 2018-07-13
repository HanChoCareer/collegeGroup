import { Component, OnInit } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { PrismService } from '../prism.service';
import { Attendance } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  members: any;
  total: number;
  selectedDate: Date;
  data: any;
  meetingTotal: number = 0;
  worshipTotal: number = 0;

  teamNames = ['YOLO', '김선자', '새가족', '아람단', '햄볶음'];
  teamName: string;

  attendanceData: Array<any> = [];
  teamAttendance: any;

  constructor(
    private ps: PrismService
  ) {}

  ngOnInit() {
    this.ps.getMembers().subscribe(res => {
      this.members = res;
      this.total = this.members.length;
    });
    let today = new Date();
    let first = today.getDate() - today.getDay();
    let firstDay = new Date(today.setDate(first));
    this.selectedDate = new Date(firstDay.toDateString());
    this.viewAttendance();
  }

  viewAttendance() {
    this.teamAttendance = [];
    if (this.attendanceData.length > 0) {
      this.attendanceData = [];
    }
    this.ps.getAttendance(this.selectedDate).subscribe(res => {
      this.data = res;
      this.worshipTotal = this.data.filter(attendance => attendance.service).length;
      this.meetingTotal = this.data.filter(attendance => attendance.meeting).length;

      for (let teamName of this.teamNames) {
        let team = new Attendance();
        team.team = teamName;
        team.total = this.data.filter(attendance => attendance.team_name === teamName).length;
        team.service = this.data.filter(attendance => attendance.team_name === teamName).filter(res => res.service).length;
        team.meeting = this.data.filter(attendance => attendance.team_name === teamName).filter(res => res.meeting).length;
        this.attendanceData.push(team);
      }
    });
  }

  onPointClick(e) {
    this.teamName = e.target.argument;
    this.teamAttendance = this.data.filter(attendance => attendance.team_name === e.target.argument);
    // var teamData = this.data.filter(attendance => attendance.team_name === e.target.argument)
    console.log(this.teamAttendance);
  }

}
