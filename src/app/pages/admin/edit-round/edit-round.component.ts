// src/app/pages/admin/update-event/update-event.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/services/api.service';
import { UtilsService } from './../../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoundModel } from './../../../core/models/round.model';

@Component({
  selector: 'app-edit-round',
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.scss']
})
export class EditRoundComponent implements OnInit, OnDestroy {
  pageTitle = "Edit Round Details";
  routeSub: Subscription;
  roundSub: Subscription;
  round: RoundModel;
  loading: boolean;
  error: boolean;
  private _id: string;
  
  
  constructor(    
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
                  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
        // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getRound();
    });
  }
  
  
  private _getRound() {
    this.loading = true;
    // GET event by ID
    this.roundSub = this.api
      .getDatabyId$('rounds', this._id)
      .subscribe(
        res => {
          this.round = res;
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
    this.routeSub.unsubscribe();
    this.roundSub.unsubscribe();
  }


}