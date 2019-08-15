import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';

import { CreateTeamOwnerComponent } from './pages/admin/create-team-owner/create-team-owner.component';
import { EditTeamOwnerComponent } from './pages/admin/edit-team-owner/edit-team-owner.component';

import { TeamOwnerComponent } from './pages/team-owner/team-owner.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }, 
  {path: 'admin', canActivate: [ AuthGuard, AdminGuard ], children: [ { path: '', component: AdminComponent }, 
                                                                      { path: 'teamOwner/:id', component: EditTeamOwnerComponent }
                                                                    ]}, 
  {path: 'create', canActivate: [ AuthGuard, AdminGuard], children: [ {path: 'teamOwner', component: CreateTeamOwnerComponent}]},
  {path: 'teamOwner', canActivate: [ AuthGuard], children: [ {path: ':id', component: TeamOwnerComponent}]}

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
