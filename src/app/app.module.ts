/**
 * Title: app.module.ts
 * Author: Professor Krasso
 * Modified by: Patrick Cuauro
 * Date: 11/15/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { BaseNavComponent } from './layouts/nav/base-nav/base-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { ConfigurationTableComponent } from './user-configuration/configuration-table/configuration-table.component';
import { UserDeleteDialogComponent } from './user-configuration/user-delete-dialog/user-delete-dialog.component';
import { UserEditComponent } from './user-configuration/user-edit/user-edit.component';
import { UserCreateComponent } from './user-configuration/user-create/user-create.component';
//this is the http client module that we need to retrieve data from the server

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    FooterComponent,
    ProfileComponent,
    BaseNavComponent,
    NotFoundComponent,
    UserConfigurationComponent,
    ConfigurationTableComponent,
    UserDeleteDialogComponent,
    UserEditComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
