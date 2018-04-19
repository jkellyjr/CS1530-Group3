import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../auth/index';
import { User } from '../library/objects/index';
import { GroupCreateDialogComponent } from '../group-create-dialog/group-create-dialog.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  logged:Boolean;
  loggedSubscription: ISubscription;

  user:User;
  userSubscription: ISubscription;

  constructor(private authService: AuthService,
              public dialog:MatDialog) { }

  ngOnInit() {
    this.loggedSubscription = this.authService.logged.subscribe(
      logged => {
          this.logged = logged;
      });

    this.userSubscription = this.authService.user.subscribe(
      user => {
          this.user = user;
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(GroupCreateDialogComponent, {
      width:'500px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

}
