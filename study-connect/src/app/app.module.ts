import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard, AuthService } from './auth/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeModule } from './home/home.module';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { GroupCreateDialogComponent } from './group-create-dialog/group-create-dialog.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GroupCreateDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    HomeModule.forRoot(),
    HttpModule
  ],
  providers: [ AuthGuard, AuthService, UserService ],
  entryComponents: [ GroupCreateDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
