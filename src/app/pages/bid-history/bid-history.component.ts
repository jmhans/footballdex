import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/services/api.service';
import { UtilsService } from './../../core/services/utils.service';
import { ConfigService } from './../../core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidModel } from './../../core/models/bid.model';

import { FilterSortService } from './../../core/services/filter-sort.service';
import { MatDatepickerModule ,MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit, OnDestroy {

  pageTitle = 'My Bids';
  bidListSub: Subscription;
  loggedInSub: Subscription;
  submitSub: Subscription;
  bidList: BidModel[];
  loading: boolean;
  error: boolean;
  query: string = '';
  email: string = '';
  submitting: boolean; 
  
    
  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService, 
    private datePipe: DatePipe, 
    private auth: AuthService, 
    private config: ConfigService,
         public router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        this.loading = true;
        if (loggedIn) {
          this._getBidsList();
        }
      }
    );
    
  }
  
  private _getBidsList() {
    this.loading = true;
    // Get future, public events
    this.bidListSub = this.api
      .getDatabyId$('userbids', this.auth.userProfile.name)
      .subscribe(
        res => {
          this.bidList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  
  _canDelete() {
    return new Date() <= this.config.bid_end_time;
  }
  
  _deleteBid(bid) {
    this.submitting = true;
      
      if (bid._id) {
        this.submitSub = this.api
          .deleteData$('bids', bid._id)
          .subscribe(
            data => this._handleDeleteSuccess(data),
            err => this._handleDeleteError(err)
          );
      }
    }
  private _handleDeleteSuccess(res) {
    this.error = false;
    this.submitting = false;
    this._getBidsList();
    // Redirect to Golfer detail
    this.router.navigate(['/bids']);
  }

  private _handleDeleteError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    this.bidListSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }
  

}