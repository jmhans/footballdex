import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { GolferComponent } from './pages/golfer/golfer.component';

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
  {path: 'golfer', canActivate: [ AuthGuard ], children: [{ path: ':id', component: GolferComponent }]}
  
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
