import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { remoteRoutes } from './entry.routes';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    NxWelcomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(remoteRoutes),
  ],
  providers: []
})
export class RemoteEntryModule {}
