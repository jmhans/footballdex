// src/app/pages/admin/admin.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { FilterSortService } from './../../core/services/filter-sort.service';
import { Subscription } from 'rxjs';
import { GolferModel } from './../../core/models/golfer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  pageTitle = 'Admin';
  golfersSub: Subscription;
  golferList: GolferModel[];
  filteredGolfers: GolferModel[];
  loading: boolean;
  error: boolean;
  query = '';
  loggedInSub : Subscription;
  loggedIn: boolean;
  tabSub: Subscription;
  tab: string;

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getGolferList();
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        this.loading = true;
        if (loggedIn) {
          this._routeSubs();
        }
      }
    );
  }
  

  private _routeSubs() {

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'list';
      });
  }
  
  

  private _getGolferList() {
    this.loading = true;
    // Get all (admin) events
    this.golfersSub = this.api
      .getData$('golfers')
      .subscribe(
        res => {
          this.golferList = res;
          this.filteredGolfers = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchGolfers() {
    this.filteredGolfers = this.fs.search(this.golferList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredGolfers = this.golferList;
  }

  ngOnDestroy() {
    this.golfersSub.unsubscribe();
  }

}
