import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule('products', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule('dashboard', './Module').then((m) => m.RemoteEntryModule),
  }
];
