import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})
export class MemberManagementComponent implements OnInit {

  navLinks = [
    {path: 'dashboard', label: 'Dashboard'},
    {path: 'attendance', label: 'Attendance'},
    {path: 'management', label: 'Management'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
