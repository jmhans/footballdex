import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/services/api.service';
import { UtilsService } from './../../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RFAModel } from './../../../core/models/rfa.model';

@Component({
  selector: 'app-edit-rfa',
  templateUrl: './edit-rfa.component.html',
  styleUrls: ['./edit-rfa.component.scss']
})
export class EditRfaComponent implements OnInit, OnDestroy {

 pageTitle = "Edit RFA Details";
  routeSub: Subscription;
  rfaSub: Subscription;
  rfa: RFAModel;
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
        this._getRFA();
    });
  }
  
  
  private _getRFA() {
    this.loading = true;
    // GET event by ID
    this.rfaSub = this.api
      .getDatabyId$('rfas', this._id)
      .subscribe(
        res => {
          this.rfa = res.rfa;
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
    this.rfaSub.unsubscribe();
  }
}



