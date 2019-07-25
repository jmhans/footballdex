import { Component, OnInit, OnDestroy, Input , Output, ChangeDetectorRef, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray,  FormControl} from '@angular/forms';
import { GroupModel, FormGroupModel } from './../../../core/models/group.model';
import { RoundModel } from './../../../core/models/round.model';
import { ApiService } from './../../../core/services/api.service';
import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



interface ScoreEntry {
  group: any;
  hole: number;
  score: number;
}
@Component({
  selector: 'app-sgg-scores',
  templateUrl: './sgg-scores.component.html',
  styleUrls: ['./sgg-scores.component.scss']
})
export class SggScoresComponent implements OnInit, OnDestroy {
  @Input() groups: any[];
  @Input() holes: any[];
  @Output() scoreSubmitted: EventEmitter<any> = new EventEmitter();
  
   //@Input() round: RoundModel;
  groupId: string;
  group: GroupModel;
  hole: number;
  holeObj: any;
  scoreForm: ScoreEntry;
  isEdit: boolean;
  // FormBuilder form
  dataForm: FormGroup;
  // Model storing initial form values
  formObj: ScoreEntry;
  // Form validation and disabled logic
  
  loading: boolean;
  errors: boolean;
  golfersSub: Subscription;
  querySub: Subscription;
  
  
  formChangeSub: Subscription;
  // Form submission
  submitObj: {hole: number, groupScore: Number, golferScores: ScoreEntry[]};
  submitSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  
  formErrors: any = {group: 'Group is required', hole: 'hole is required', score:'Score is required' }; 
  //   dataForm: FormGroup;
  
  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
  }
    validationMessages: any = {

    }
  
  
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    public router: Router
  ) { }
  
  
  _getNextHole() {
    for (var h=1; h<=18; h++) {
      var this_hole = this.group.groupScores.find((hl)=>{return (hl.number==h);})
      if (this_hole) {
        if(this_hole.net_score) {
          return h;
        }
      }
    }
    return 1;
  }

   ngOnInit() {
    
     var _this = this;
     
     
    this.querySub = this.route.queryParams
      .subscribe(queryParams => {
        _this.groupId = queryParams['groupId'] || '';
        
          if (_this.groupId != '') {
            _this.group = _this.groups.find((grp) => {return grp._id == _this.groupId});
            
            if(_this.group['groupScores']['holes']) {
              _this.holeObj = _this.group.groupScores['holes'].find((hl) => {return (hl.number == parseInt(queryParams['hole']))})  
            }  
        }
        _this.hole = parseInt(queryParams['hole']) || this._getNextHole();
        _this._updateFormData(); // Need to check if still needed. 
    });

    this.submitBtnText = 'Submit score';
    // Set initial form data
    this.formObj = this.scoreForm; //this._setFormObj();
    // Use FormBuilder to construct the form

    this._buildForm();


  }
    


  getGroupHoleScore() {
    if (this.group) {
      if (this.group.groupScores) {
        var this_hole= (this.group.groupScores.find((hl) => {return (hl.number == this.hole);}))
          if (this_hole) {
            return this_hole.net_score || null;
          }
      }
    }
      
    return null
    
  }

  

  private _buildForm() {
    //this.group.groupScores = this.group.groupScores || [{hole: this.hole, score: ''}]
    
    this.dataForm = this.fb.group({
      group: [this.group], 
      hole: [this.hole], 
      score: [this.getGroupHoleScore()]
    });
    
    // Subscribe to form value changes
    this.formChangeSub = this.dataForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an Golfer that is no
    // longer valid (for example, an Golfer in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.dataForm);
      
    }

  }

   private _updateFormData() {
     const _this = this
     if (this.dataForm) {
       this.dataForm.get('score').setValue(this.getGroupHoleScore())
       this.dataForm.get('hole').setValue(this.hole)
       this.dataForm.get('group').setValue(this.group)
     }

   }
  

  previousHole() {
    return Math.max(1, this.hole-1);
  }
  nextHole() {
    return Math.min(18, this.hole+1);
  }
  
  private _onValueChanged() {
    if (!this.dataForm) { return; }
    
    
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.dataForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {

    const _this = this
    if (this.holeObj) {
      return {hole: _this.hole, groupScore: _this.dataForm.get('score').value, group: _this.group._id, _id: _this.holeObj._id,  par: this.getHolePar()};  
    } else {
      return {hole: _this.hole, groupScore: _this.dataForm.get('score').value, group: _this.group._id, par: this.getHolePar()};
    }
    
  }
  
  getHolePar() {
    if (this.holes.length >0) {
        return (this.holes.find((hl)=>{ return (this.hole == hl.number)}).par || null);
      }
    return 0;
  }

  onSubmit() {
    this.submitting = true;
    this.scoreSubmitted.emit(this._getSubmitObj());
  }
  
  


  resetForm() {
    this.dataForm.reset();
  }
  
  ngOnDestroy() {
   if (this.submitSub) {
      this.submitSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  
  }
  
  
}
