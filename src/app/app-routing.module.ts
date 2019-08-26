import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';

import { CreateTeamOwnerComponent } from './pages/admin/create-team-owner/create-team-owner.component';
import { EditTeamOwnerComponent } from './pages/admin/edit-team-owner/edit-team-owner.component';

import { CreateRfaComponent } from './pages/admin/create-rfa/create-rfa.component';
import { EditRfaComponent } from './pages/admin/edit-rfa/edit-rfa.component';

import { TeamOwnerComponent } from './pages/team-owner/team-owner.component';
import { RfasComponent } from './rfas/rfas.component';
import { DetailsComponent } from './rfas/details/details.component';
import { BidHistoryComponent } from './pages/bid-history/bid-history.component';


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
                                                                      { path: 'teamOwner/:id', component: EditTeamOwnerComponent },
                                                                     { path: 'rfa/:id', component: EditRfaComponent }
                                                                    ]}, 
  {path: 'create', canActivate: [ AuthGuard], children: [ {path: 'teamOwner', component: CreateTeamOwnerComponent}, 
                                                                    {path: 'rfa', component: CreateRfaComponent}
                                                                    ]},
  {path: 'teamOwner', canActivate: [ AuthGuard], children: [ {path: ':id', component: TeamOwnerComponent}]},
  {path: 'rfa', canActivate: [ AuthGuard], children: [ {path: '', component: RfasComponent}, 
                                                     {path: ':id', component: DetailsComponent }]},
  {path: 'bids', canActivate: [ AuthGuard], children: [ {path: '', component: BidHistoryComponent}]}

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
