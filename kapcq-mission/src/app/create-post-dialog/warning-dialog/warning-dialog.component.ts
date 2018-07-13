import { Component, OnInit } from '@angular/core';
import { PrismService } from '../../prism.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnouncementComponent } from '../../announcement/announcement.component';
import { CreatePostDialogComponent } from '../create-post-dialog.component'

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit {

  constructor(
		private ps: PrismService,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<WarningDialogComponent>,
		public dialogRef1: MatDialogRef<CreatePostDialogComponent>) { }


	closeWarning(): void {
		this.dialogRef.close();
		this.openCreateDialog();
	}
	
	openCreateDialog(): void {
		let dialogRef = this.dialog.open(CreatePostDialogComponent,{
			width: '450px',
		});
	}

  ngOnInit() {
  }
}
