import { Component, OnInit } from '@angular/core';
import { PrismService } from '../prism.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  team: string;
  members: Array<any> = [];
  attendanceDate: Date; 
  data: any;

  constructor(
    private ps: PrismService
  ) { }

  ngOnInit() {
    let today = new Date();
    let first = today.getDate() - today.getDay();
    let firstDay = new Date(today.setDate(first));
    this.attendanceDate = new Date(firstDay.toDateString());
  }

  getTeamMembers() {
    this.members = [];
    if(this.team && this.attendanceDate) {
      this.ps.getTeamMembers(this.team).subscribe(team => {
        this.ps.getAttendance(this.attendanceDate).subscribe(attendance => {
          for (let member of team) {
            const item = attendance.filter(x => x.name === member.name);
            if (item.length > 0) {
              member.meeting = item[0].meeting;
              member.service = item[0].service;
              member.note = item[0].note;
              if (member.note != "") {
                member.showNote = true;
              }
            } 
          }
          if (this.members.length == 0) {
            this.members = team;
          }
        });
      });
    }
  }

  addAttendance() {
    console.log(this.members);
    console.log('Adding attendance...');
    if (this.attendanceDate) {
      for (const member of this.members) {
        if (member.service === undefined) {
          member.service = false;
        }
        if (member.meeting === undefined) {
          member.meeting = false;
        }
        if (member.note === undefined) {
          member.note = '';
        }
        member.attendanceDate = this.attendanceDate;
        this.ps.addAttendance(member.id, member.name, member.team_name, member.attendanceDate, member.service, member.meeting, member.note);
      }
    }
    this.members = [];
  }
}
