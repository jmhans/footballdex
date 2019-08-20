import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../auth/auth.service';
import { ApiService } from './../core/services/api.service';
import { UtilsService } from './../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RFAModel } from './../core/models/rfa.model';

import { FilterSortService } from './../core/services/filter-sort.service';
import { MatDatepickerModule ,MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rfas',
  templateUrl: './rfas.component.html',
  styleUrls: ['./rfas.component.scss']
})
export class RfasComponent implements OnInit, OnDestroy {

pageTitle = 'Restricted Free Agents';
  rfaListSub: Subscription;
  rfaList: RFAModel[];
  filteredRFAs: RFAModel[];
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
    this._getRFAList();
    
  }
  
  private _getRFAList() {
    this.loading = true;
    // Get future, public events
    this.rfaListSub = this.api
      .getData$('rfas')
      .subscribe(
        res => {
          this.rfaList = res;
          this.filteredRFAs = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchRFAs() {
    this.filteredRFAs = this.fs.search(this.rfaList, this.query, '_id', 'mediumDate');
    
  }

  resetQuery() {
    this.modelDate.reset();
    this.query = '';
    this.filteredRFAs = this.rfaList;
  }

  ngOnDestroy() {
    this.rfaListSub.unsubscribe();
  }
  
  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  

}






