import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../../auth/auth.service';
import { UtilsService } from './../../../../core/services/utils.service';
import { RoundModel } from './../../../../core/models/round.model';
import { Subscription, interval, Observable, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-round-details',
  templateUrl: './round-details.component.html',
  styleUrls: ['./round-details.component.scss']
})
export class RoundDetailsComponent implements OnInit {
  @Input() round: RoundModel;
  loading: boolean;
  error: boolean;

  constructor(    public auth: AuthService  ) { }

  ngOnInit() {
    
  }
  
  ngOnDestroy() {
  }

}
