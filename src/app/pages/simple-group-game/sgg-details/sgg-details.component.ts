import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/services/utils.service';
import { RoundModel } from './../../../core/models/round.model';
import { Subscription, interval, Observable, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sgg-details',
  templateUrl: './sgg-details.component.html',
  styleUrls: ['./sgg-details.component.scss']
})
export class SggDetailsComponent implements OnInit {
  @Input() round: RoundModel;
  loading: boolean;
  error: boolean;
  constructor(public auth: AuthService ) { }

  ngOnInit() {
  }

}


