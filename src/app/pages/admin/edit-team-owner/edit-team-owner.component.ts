// src/app/pages/admin/update-event/update-event.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../auth/auth.service';
import { ApiService } from './../../../core/services/api.service';
import { UtilsService } from './../../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamOwnerModel } from './../../../core/models/teamOwners.model';

@Component({
  selector: 'app-edit-team-owner',
  templateUrl: './edit-team-owner.component.html',
  styleUrls: ['./edit-team-owner.component.scss']
})
export class EditTeamOwnerComponent implements OnInit, OnDestroy {

  pageTitle = "Edit Owner Details";
  routeSub: Subscription;
  teamOwnerSub: Subscription;
  teamOwner: TeamOwnerModel;
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
        this._getTeamOwner();
    });
  }
  
  
  private _getTeamOwner() {
    this.loading = true;
    // GET event by ID
    this.teamOwnerSub = this.api
      .getDatabyId$('teamOwners', this._id)
      .subscribe(
        res => {
          this.teamOwner = res;
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
    this.teamOwnerSub.unsubscribe();
  }

}
