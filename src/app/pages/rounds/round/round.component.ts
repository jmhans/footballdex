import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/services/api.service';
import { UtilsService } from './../../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoundModel } from './../../../core/models/round.model';



@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit, OnDestroy {

pageTitle: string;
id: string;
loggedInSub: Subscription;
routeSub: Subscription;
tabSub: Subscription;
roundSub: Subscription;
round: RoundModel;
loading: boolean;
error: boolean;
tab: string;
playHole: number;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) { }

  ngOnInit() {
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
    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getRound(); 
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
        this.playHole = parseInt(queryParams['hole']) || 1;
      });
  }

  private _getRound() {
    this.loading = true;
    // GET event by ID
    this.roundSub = this.api
      .getDatabyId$('rounds', this.id)
      .subscribe(
        res => {
          this.round = res;
          this._setPageTitle(this.round.description);
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Error');
        }
      );
  }


  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.roundSub.unsubscribe();
  }
}

