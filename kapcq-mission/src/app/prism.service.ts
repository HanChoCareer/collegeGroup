import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}

@Injectable()
export class PrismService {

  postsCol: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore
    ) { }

  getPosts() {
    return this.afs.collection('posts');
  }

  getAnnouncements() {
    return this.afs.collection('announcement');
  }

  getMembers() {
    return this.afs.collection('attendance').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getTeamMembers(team) {
    return this.afs.collection('attendance', ref => ref.where('Team', '==', team)).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getAttendance(date) {
    return this.afs.collection('attendance', ref => ref.where('attendance_date', '==', date)).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  addMember(thatName, thatTeam, thatDob, thatFirstAttend, thatAddress) {
    this.afs.collection('attendance').add({
      name: thatName,
      team: thatTeam,
      dob: thatDob,
      firstAttend: thatFirstAttend,
      address: thatAddress
    });
  }
  
  updateMember(id, thatName, thatTeam, thatDob, thatFirstAttend, thatAddress) {
    console.log(id, thatName, thatTeam, thatDob, thatFirstAttend, thatAddress);
    this.afs.collection('attendance').doc(id).set({
      name: thatName,
      team: thatTeam,
      dob: thatDob,
      firstAttend: thatFirstAttend,
      thatAddress: thatAddress
    }, {merge: true});
  }
  addAnnouncement(content: string, group: string, teamcolor: string, title: string, writer: string, location: string, time: string, date: Date) {
    this.afs.collection('announcement').add({'Content': content, 'Group': group, 'TeamColor': teamcolor, 'Title': title, 'Writer': writer, 'Location': location, 'Time':time, 'Date':date});
  }

  addAttendance(id, name, team, date, service, meeting, note) {
    this.afs.collection('attendance').doc(id + '-' + date.toISOString().split('T')[0]).set({
      member_id: id,
      team_name: team,
      attendance_date: date,
      service: service,
      meeting: meeting
    }, {merge: true});
  }

  getDocumentId() {
    return this.afs.collection('members').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
}
