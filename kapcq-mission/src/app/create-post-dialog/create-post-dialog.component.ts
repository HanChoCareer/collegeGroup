import { Component, OnInit, Inject } from '@angular/core';
import { PrismService } from '../prism.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';


@Component({
	selector: 'app-create-post-dialog',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialogComponent implements OnInit {

	title: string;
	name: string;
	content: string;
	group: string;
	team: string;
	location: string;
	time: string;
	date: Date;

	constructor(
		private ps: PrismService,
		public dialogRef: MatDialogRef<CreatePostDialogComponent>,
		public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
	submit(): void {
		try{
			this.ps.addAnnouncement(this.content, this.group, this.team, this.title, this.name, this.location, this.time, this.date);
		}
		catch(e)
		{
			console.log('error',e);
			this.openDialog();
		}

		console.log(this.group);
		this.dialogRef.close();
	}

	openDialog(): void{
		let dialogRef = this.dialog.open(WarningDialogComponent,{
			width: '225px',
		});

	}

	ngOnInit() {}
}


