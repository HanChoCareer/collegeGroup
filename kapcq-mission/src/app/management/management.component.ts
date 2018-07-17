import { Component, OnInit } from '@angular/core';
import { PrismService } from '../services/prism.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})

export class ManagementComponent implements OnInit {

  attendance: any;

  constructor(
    private ps: PrismService
  ) { }

  ngOnInit() {
    var memberArray = [];
    this.ps.getMembers().subscribe(res => {
      this.attendance = res;
    });
  }

  addMember(e) {
    console.log('adding member...');
    // console.log(e.data);
    if (e.data.name && e.data.team && e.data.dob && e.data.firstAttend && e.data.address) {
      // console.log('Name: ' + e.data.name + " Team Name: " + e.data.team_name);
      this.ps.addMember(e.data.name, e.data.team, e.data.dob, e.data.firstAttend,e.data.address);
    }
  }

  editMember(e) {
    console.log('updating member...');
    if (e.newData.name == undefined) {
      e.newData.name = e.oldData.name;
    }
    if (e.newData.team == undefined) {
      e.newData.team = e.oldData.team;
    }
    if (e.oldData.id && e.newData.name && e.newData.team && e.newData.Dob && e.newData.firstAttend && e.newData.address) {
      this.ps.updateMember(e.oldData.id, e.newData.name, e.newData.team, e.newData.dob, e.newData.firstAttend, e.newData.address);
    }
  }

}
