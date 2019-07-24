import { BrowserModule , Title, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule, MatNativeDateModule, MatAutocompleteModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SubadminComponent } from './pages/admin/subadmin/subadmin.component';
import { CourseFormComponent } from './pages/admin/course-form/course-form.component';
import { RoundFormComponent } from './pages/admin/round-form/round-form.component';
import { ScorecardFormComponent } from './pages/admin/scorecard-form/scorecard-form.component';
import { GroupFormComponent } from './pages/admin/group-form/group-form.component';
import { CreateRoundComponent } from './pages/admin/create-round/create-round.component';
import { RoundsComponent } from './pages/rounds/rounds.component';
import { RoundComponent } from './pages/rounds/round/round.component';
import { RoundDetailsComponent } from './pages/rounds/round/round-details/round-details.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { EditComponent } from './scorecard/edit/edit.component';
import { EditRoundComponent } from './pages/admin/edit-round/edit-round.component';
import { SimpleGroupGameComponent } from './pages/simple-group-game/simple-group-game.component';
import { SggDetailsComponent } from './pages/simple-group-game/sgg-details/sgg-details.component';
import { SggScoresComponent } from './pages/simple-group-game/sgg-scores/sgg-scores.component';
import { SimpleScoreFormComponent } from './pages/admin/simple-score-form/simple-score-form.component';


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
    GolferComponent,
    SubadminComponent,
    CourseFormComponent,
    RoundFormComponent,
    ScorecardFormComponent,
    GroupFormComponent,
    CreateRoundComponent,
    RoundsComponent,
    RoundComponent,
    RoundDetailsComponent,
    ScorecardComponent,
    EditComponent,
    EditRoundComponent,
    SimpleGroupGameComponent,
    SggDetailsComponent,
    SggScoresComponent,
    SimpleScoreFormComponent
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
    HttpModule, 
    HttpClientModule,
    AppRoutingModule, 
    HttpClientModule,
    AuthModule.forRoot(),
     MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatExpansionModule
    
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
