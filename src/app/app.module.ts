import { BrowserModule , Title, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { HttpModule } from '@angular/http';
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
import { SubmittingComponent } from './core/forms/submitting/submitting.component';
import { TeamOwnersComponent } from './pages/team-owners/team-owners.component';
import { TeamOwnerFormComponent } from './pages/admin/team-owner-form/team-owner-form.component';
import { CreateTeamOwnerComponent } from './pages/admin/create-team-owner/create-team-owner.component';
import { EditTeamOwnerComponent } from './pages/admin/edit-team-owner/edit-team-owner.component';
import { TeamOwnerComponent } from './pages/team-owner/team-owner.component';
import { TeamOwnerDetailsComponent } from './pages/team-owner/team-owner-details/team-owner-details.component';
import { RfaFormComponent } from './pages/admin/rfa-form/rfa-form.component';
import { CreateRfaComponent } from './pages/admin/create-rfa/create-rfa.component';
import { RfasComponent } from './rfas/rfas.component';
import { DetailsComponent } from './rfas/details/details.component';
import { EditRfaComponent } from './pages/admin/edit-rfa/edit-rfa.component';
import { BidHistoryComponent } from './pages/bid-history/bid-history.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    AdminComponent,
    SubmittingComponent,
    TeamOwnersComponent,
    TeamOwnerFormComponent,
    CreateTeamOwnerComponent,
    EditTeamOwnerComponent,
    TeamOwnerComponent,
    TeamOwnerDetailsComponent,
    RfaFormComponent,
    CreateRfaComponent,
    RfasComponent,
    DetailsComponent,
    EditRfaComponent,
    BidHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
//    HttpModule, 
    HttpClientModule,
    AppRoutingModule, 
    HttpClientModule,
    AuthModule.forRoot(),
     MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule
    
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
export class AppModule { 
}
