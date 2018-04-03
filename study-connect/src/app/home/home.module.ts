import { NgModule, ModuleWithProviders } from '@angular/core';


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';

import { LibraryModule } from '../library/library.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AboutUsComponent
  ],
  imports: [
    HomeRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomeModule,
      providers: []
    };
  }
}
