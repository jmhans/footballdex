import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../auth/auth.service';
import { ApiService } from './../core/services/api.service';
import { UtilsService } from './../core/services/utils.service';
import { ConfigService } from './../core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RFAModelWithBids } from './../core/models/rfa.model';

import { FilterSortService } from './../core/services/filter-sort.service';
import { MatDatepickerModule ,MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';

interface extendedRFAModel {
  rfa: RFAModelWithBids; 
  error: string;
  bidAmt: number;
  success: string;
};



@Component({
  selector: 'app-rfas',
  templateUrl: './rfas.component.html',
  styleUrls: ['./rfas.component.scss']
})
export class RfasComponent implements OnInit, OnDestroy {

pageTitle = 'Restricted Free Agents';
  submitSub: Subscription;
  rfaListSub: Subscription;
  rfaList: extendedRFAModel[];
  loading: boolean;
  error: boolean;
  query: string = '';
  modelDate: FormControl;
  _editBid: boolean;
  
//  end_time: object = new Date("2020-09-06 23:59:59")

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    private datePipe: DatePipe,
    private auth: AuthService, 
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getRFAList();
    
  }
  
  private _getRFAList() {
    this.loading = true;
    // Get future, public events
    this.rfaListSub = this.api
      .getRfasForYear$('rfas', (new Date()).getFullYear())
      .subscribe(
        res => {
          this.rfaList = res.map((rfa) => {return {rfa: rfa, error:'', bidAmt:0, success: '' }});
         // this.filteredRFAs = res;
          this.rfaList.forEach((rfa) => {
            rfa.bidAmt = this._bidSummary(rfa.rfa.bids).maxBid + 1
          });

          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  
  
  _bidSummary(bids) {
    if (!bids) { return {bidCt: 0, maxBid: 0}}
    if (bids.length ==0) {return {maxBid: 0, bidCt: 0}};
      return bids.reduce(function (total, cur) {
        return {
          maxBid: Math.max(total.maxBid, cur.bid_amount), 
          bidCt: total.bidCt + 1
        }
      }, {maxBid: 0, bidCt: 0})

  }
  
  private _summarizeBidData(bids) {

    if (bids.length ==0) {return {maxBid: 0, bidCt: 0}};
    return bids.reduce(function (total, cur) {
      return {
        maxBid: Math.max(total.maxBid, cur.bid_amount), 
        bidCt: total.bidCt + 1
      }
    }, {maxBid: 0, bidCt: 0})


  }


   private _placeBid(rfa, bidAmt) {
     const bidObj = {bidder: this.auth.userProfile.name? this.auth.userProfile.name : this.auth.userProfile.email, bid_amount: bidAmt, rfa: rfa._id}
     //Fix to post data!  
     this.submitSub = this.api
      .postData$('bids', bidObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      )
   }
  
  private _handleSubmitSuccess(data) {
    var this_rfa = this.rfaList.find((listItem)=> {return listItem.rfa.rfa._id == data.rfa})
    this_rfa.rfa.bids.push(data);
    this_rfa.success = 'Success';
    this_rfa.bidAmt = this_rfa.bidAmt + 1;
    
  }
  private _handleSubmitError(err) {
    this.rfaList.find((listItem)=> {return listItem.rfa.rfa._id == err.rfa}).error = 'Error: Please try again';
  }
  
  private _bidsAllowed() {
    return (new Date() < this.config.bid_end_time);
  }

  ngOnDestroy() {
    this.rfaListSub.unsubscribe();
  }
  
  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  

}






