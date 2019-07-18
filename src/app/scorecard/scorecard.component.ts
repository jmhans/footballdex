import { Component, OnInit, Input } from '@angular/core';
import { ScorecardModel } from './../core/models/scorecard.model';
import { GroupModel } from './../core/models/group.model';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  @Input() scorecards: GroupModel[];
  
  displayedColumns: string[] = this.scorecards[0].scorecards[0].holes.map((hl)=> {return hl.number.toString()});
  constructor( private auth :AuthService ) { }

  ngOnInit() {
  }
 

}
