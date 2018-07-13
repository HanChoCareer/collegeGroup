import { Component, OnInit, Inject } from '@angular/core';
import { PrismService } from '../prism.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';


@Component({
	selector: 'app-announcement',
	templateUrl: './announcement.component.html',
	styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

	announcement: any;
	tiles = [];

	constructor(private ps: PrismService, public dialog: MatDialog) { }

	openDialog(): void{
		let dialogRef = this.dialog.open(CreatePostDialogComponent,{
			width: '450px',
		});

	}


	ngOnInit() {
		this.ps.getAnnouncements().valueChanges().subscribe(res => {
			this.announcement = res;
			//console.log(this.announcement[0]);
			//console.log(this.announcement.length);

			for(var i = 0; i < this.announcement.length; i++)
			{
				this.tiles.push(this.announcement[i]);
			}
			this.tiles.reverse();
			//console.log(this.tiles);
		})
	}

}




