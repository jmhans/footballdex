import { BrowserModule , Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule, MatNativeDateModule} from '@angular/material';

import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from './auth/auth.service';
import { DatePipe } from '@angular/common';
import { ApiService } from './core/services/api.service';
import { UtilsService } from './core/services/utils.service';
import { FilterSortService } from './core/services/filter-sort.service';

import { CallbackComponent } from './pages/callback/callback.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DataFormComponent } from './pages/admin/data-form/data-form.component';
import { SubmittingComponent } from './core/forms/submitting/submitting.component';
import { GolferComponent } from './pages/golfer/golfer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    AdminComponent,
    DataFormComponent,
    SubmittingComponent,
    GolferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpModule, 
    HttpClientModule,
    AppRoutingModule, 
    HttpClientModule,
    AuthModule.forRoot()
  ],
  providers: [
    Title, 
    AuthService, 
    ApiService, 
    DatePipe, 
    UtilsService, 
    FilterSortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
