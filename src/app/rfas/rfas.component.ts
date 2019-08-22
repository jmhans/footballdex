import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../auth/auth.service';
import { ApiService } from './../core/services/api.service';
import { UtilsService } from './../core/services/utils.service';
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

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    private datePipe: DatePipe,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getRFAList();
    
  }
  
  private _getRFAList() {
    this.loading = true;
    // Get future, public events
    this.rfaListSub = this.api
      .getData$('rfas')
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
    this.rfaList.find((listItem)=> {return listItem.rfa.rfa._id == data.rfa}).rfa.bids.push(data);
    this.rfaList.find((listItem)=> {return listItem.rfa.rfa._id == data.rfa}).success = 'Success';
  }
  private _handleSubmitError(err) {
    this.rfaList.find((listItem)=> {return listItem.rfa.rfa._id == err.rfa}).error = 'Error: Please try again';
  }
  
  

  ngOnDestroy() {
    this.rfaListSub.unsubscribe();
  }
  
  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  

}






