import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/services/utils.service';
import { TeamOwnerModel } from './../../../core/models/teamOwners.model';
import { Subscription, interval, Observable, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-team-owner-details',
  templateUrl: './team-owner-details.component.html',
  styleUrls: ['./team-owner-details.component.scss']
})
export class TeamOwnerDetailsComponent implements OnInit {

@Input() teamOwner: TeamOwnerModel;
  loading: boolean;
  error: boolean;

  constructor(    public auth: AuthService  ) { }

  ngOnInit() {
    
  }
 

}
