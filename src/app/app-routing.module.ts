import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { GolferComponent } from './pages/golfer/golfer.component';

import { CreateRoundComponent } from './pages/admin/create-round/create-round.component';
import { RoundComponent } from './pages/rounds/round/round.component';
import { RoundsComponent } from './pages/rounds/rounds.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }, 
  {path: 'admin', canActivate: [ AuthGuard, AdminGuard ], children: [ { path: '', component: AdminComponent }]}, 
  {path: 'golfer', canActivate: [ AuthGuard ], children: [{ path: ':id', component: GolferComponent }]},
  {path: 'round', canActivate: [ AuthGuard ], children: [{ path: ':id', component: RoundComponent}]}, 
  {path: 'create', canActivate: [ AuthGuard, AdminGuard], children: [ {path: 'round', component: CreateRoundComponent}]},
  {path: 'rounds', canActivate: [ AuthGuard] ,component: RoundsComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [
    AuthGuard,
    AdminGuard
  ],
})
export class AppRoutingModule { }
