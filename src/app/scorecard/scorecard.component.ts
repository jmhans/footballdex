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
  dispColumns: string[] = ['header', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
  constructor( private auth :AuthService ) { }

  ngOnInit() {
  }
  
  _makeSCgroupArray(grp) {
    var tempData = grp.scorecards.map((sc) => {return (this._makeSCholeArray(sc));});
    var parData = {header: 'par'}
    var handicapData = {header: 'handicap'}
    
    for (var h=1;h<=18; h++) {
      parData[h] = grp.scorecards[0].holes.find((hl)=> {return (hl.number == h)}).par || '';
      handicapData[h] = grp.scorecards[0].holes.find((hl)=> {return (hl.number == h)}).handicap || '';
    }
    tempData.unshift(parData, handicapData)
    return tempData
  }
  
  _makeSCholeArray(sc) {
    var retObj = {header: sc.golfer.nickname}
    for (var h=1;h<=18; h++) {
      retObj[h] = sc.holes.find((hl)=> {return (hl.number == h)}).score || '';
    }
    return retObj;
  }
  
 

}
