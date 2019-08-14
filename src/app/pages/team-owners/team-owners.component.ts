import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamOwnerModel } from './../../core/models/teamOwners.model';

import { FilterSortService } from './../../core/services/filter-sort.service';
import { MatDatepickerModule ,MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-team-owners',
  templateUrl: './team-owners.component.html',
  styleUrls: ['./team-owners.component.scss']
})
export class TeamOwnersComponent implements OnInit, OnDestroy {

  pageTitle = 'Team Owners';
  teamOwnersListSub: Subscription;
  teamOwnersList: TeamOwnerModel[];
  filteredTeamOwners: TeamOwnerModel[];
  loading: boolean;
  error: boolean;
  query: string = '';
  modelDate: FormControl;

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService, 
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getTeamOwnersList();
    
  }
  
  private _getTeamOwnersList() {
    this.loading = true;
    // Get future, public events
    this.teamOwnersListSub = this.api
      .getData$('teamOwners')
      .subscribe(
        res => {
          this.teamOwnersList = res;
          this.filteredTeamOwners = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchTeamOwners() {
    this.filteredTeamOwners = this.fs.search(this.teamOwnersList, this.query, '_id', 'mediumDate');
    
  }

  resetQuery() {
    this.modelDate.reset();
    this.query = '';
    this.filteredTeamOwners = this.teamOwnersList;
  }

  ngOnDestroy() {
    this.teamOwnersListSub.unsubscribe();
  }
  
  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  
  

}





