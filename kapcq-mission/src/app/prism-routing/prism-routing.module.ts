import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberManagementComponent } from '../member-management/member-management.component';
import { AdminComponent } from '../admin/admin.component';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { AttendanceComponent } from '../attendance/attendance.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManagementComponent } from '../management/management.component';


const routes: Routes = [
  { path: '', redirectTo: '/member/dashboard', pathMatch: 'full' },
  { path: 'member', component: MemberManagementComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'attendance', component: AttendanceComponent},
    { path: 'management', component: ManagementComponent},
  ]},
  { path: 'admin', component: AdminComponent },
  { path: 'announcement', component: AnnouncementComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PrismRoutingModule { }
