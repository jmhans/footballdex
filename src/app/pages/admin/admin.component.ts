// src/app/pages/admin/admin.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { FilterSortService } from './../../core/services/filter-sort.service';
import { Subscription } from 'rxjs';
import { TeamOwnerModel } from './../../core/models/teamOwners.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  pageTitle = 'Admin';
  teamOwnersSub: Subscription;
  teamOwnerList: TeamOwnerModel[];
  teamList: any[];
  teamsSub: Subscription;
  filteredTeamOwners: TeamOwnerModel[];
  loading: boolean;
  error: boolean;
  query = '';
  loggedInSub : Subscription;
  loggedIn: boolean;
  tabSub: Subscription;
  tab: string;
  
  availableModels: any[];
  

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.title.setTitle(this.pageTitle);
    this._getTeamsForOwner();
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
  
  

  private _getTeamsForOwner() {
    this.loading = true;
    // Get all (admin) events
    
    this.teamsSub = this.api
      .getData$('teamowners')
      .subscribe(
        res => {
          this.teamList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }

}
