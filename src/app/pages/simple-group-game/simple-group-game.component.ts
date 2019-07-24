import { Component, OnInit, OnDestroy , Output} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { FilterSortService } from './../../core/services/filter-sort.service';
import { Subscription } from 'rxjs';
import { RoundModel } from './../../core/models/round.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-simple-group-game',
  templateUrl: './simple-group-game.component.html',
  styleUrls: ['./simple-group-game.component.scss']
})
export class SimpleGroupGameComponent implements OnInit, OnDestroy {
  pageTitle = 'Group Game';
  id: string;
  roundSub: Subscription;
  round: RoundModel;
//   golfersSub: Subscription;
//   golferList: GolferModel[];
//   filteredGolfers: GolferModel[];
  loading: boolean;
  error: boolean;
  query = '';
  loggedInSub : Subscription;
  loggedIn: boolean;
  tabSub: Subscription;
  tab: string;
  routeSub: Subscription;
  submitSub: Subscription;
  
  submitting :boolean;
  
  availableModels: any[];
  

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
   
    this.title.setTitle(this.pageTitle);
    
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

     this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getRound(); 
      });
    
    // Subscribe to query params to watch for tab changes
    
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
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
  
  private _getHoles() {
    if (this.round) {
      return (  this.round.course.tees[0].holes.map((hl)=> {return {number: hl.number, par: hl.par, handicap: hl.handicap}}));
    }
    return [];
  }
  
  
    private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }
  
  submitScores(scoreData) {
    console.log(scoreData);
    
    if (!scoreData._id) {
      this.submitSub = this.api
        .postScore$(this.round._id, scoreData)
        .subscribe(
          data=> this._handleSubmitSuccess(data), 
          err => this._handleSubmitError(err)
      )
    } else {
      this.submitSub = this.api
        .editScore$(this.round._id, scoreData)
        .subscribe(
        data=> this._handleSubmitSuccess(data), 
        err => this._handleSubmitError(err)
      )
    }
    

  }
  
    private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to Golfer detail
    this.router.navigate(['/groupgame/', this.id ] );
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }
  
  
  
  ngOnDestroy() {
    this.roundSub.unsubscribe();
    this.tabSub.unsubscribe();
  }


}

