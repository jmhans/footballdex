import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoundModel } from './../../core/models/round.model';

import { FilterSortService } from './../../core/services/filter-sort.service';
import { MatDatepickerModule ,MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})

export class RoundsComponent implements OnInit, OnDestroy {
  pageTitle = 'Rounds';
  roundsListSub: Subscription;
  roundsList: RoundModel[];
  filteredRounds: RoundModel[];
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
    this._getRoundsList();
    
  }
  

  private _getRoundsList() {
    this.loading = true;
    // Get future, public events
    this.roundsListSub = this.api
      .getData$('rounds')
      .subscribe(
        res => {
          this.roundsList = res;
          this.filteredRounds = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchRounds() {
    this.filteredRounds = this.fs.search(this.roundsList, this.query, '_id', 'mediumDate');
    
  }

  resetQuery() {
    this.modelDate.reset();
    this.query = '';
    this.filteredRounds = this.roundsList;
  }

  ngOnDestroy() {
    this.roundsListSub.unsubscribe();
  }
  
  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

}




