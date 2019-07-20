import { Component, OnInit, OnDestroy, Input , ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray,  FormControl} from '@angular/forms';
import { GroupModel, FormGroupModel } from './../../../core/models/group.model';
import { RoundModel } from './../../../core/models/round.model';
import { ApiService } from './../../../core/services/api.service';
import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


interface ScoreEntry {
  hole: number;  
  golfer: any;
  score: number;
}


@Component({
  selector: 'app-scorecard-form',
  templateUrl: './scorecard-form.component.html',
  styleUrls: ['./scorecard-form.component.scss']
})
export class ScorecardFormComponent implements OnInit, OnDestroy {
 @Input() group: GroupModel;
 @Input() round: RoundModel;
  hole: number;
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
  submitObj: ScoreEntry[];
  submitSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  
  //   dataForm: FormGroup;
  
  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
  }
  
  // Set up errors object
  formErrors: any = {
    description: '',
    groups: '',
    date: '', 
    course: ''
  }
  
  validationMessages: any = {

    }
  
  constructor(        private route: ActivatedRoute,
                       private fb: FormBuilder,
    private api: ApiService,
    public router: Router) { }


  ngOnInit() {
    this.formErrors = this.formErrors;
    this.isEdit = !!this.group;
    this.submitBtnText = this.isEdit ? 'Update Data' : 'Create Data';
    // Set initial form data
    this.formObj = this.scoreForm; //this._setFormObj();
    // Use FormBuilder to construct the form
    this.querySub = this.route.queryParams
      .subscribe(queryParams => {
        this.hole = parseInt(queryParams['hole']) || 1;
        console.log ("Hole changed");
        this._updateFormData();
    
    });

        this._buildForm();


  }
    

//   private _setFormObj() {
//     if (!this.isEdit) {
//       // If creating a new Golfer, create new
//       // FormGolferModel with default null data
//       return new ScoreEntry(null,[{golfer: 'somename', otherField: 'somevalue'}] /* Create a new 'group' and put in here*/,null, null);
//     } else {
//       return new FormRoundModel(
//         this.round.description,
//         this.round.groups, 
//         this.round.date, 
//         this.round.course
//       );
//     }
//   }


  

  private _buildForm() {
    
  
    this.dataForm = this.fb.group({
      golferScores: this.fb.array(
        this.group.scorecards.map((sc)=> {
          
          const _this = this;
          
          return (this.fb.group({
            golfer: [ sc.golfer, []], 
            score: [sc.holes.find((hl)=> { return (hl.number == _this.hole)}).score || 0 , []]
          }))
        }),
      ),
      allScores: this.fb.array(
        this.group.scorecards.map((sc)=> {
          const _this = this;
          return (this.fb.group({
            golfer: [sc.golfer, []], 
            scores: _this.fb.array(sc.holes.map((hl)=> { return _this.fb.group({hole:[hl.number], score: [hl.score || 0], strokes: [hl.handicap_strokes || 0] })})),
            newScore: [sc.holes.find((hl)=> {return (hl.number ==_this.hole);}).score || 0,[]]
          }))
        })
      )
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
    
    console.log(this.dataForm.controls);

    this._onValueChanged();
  }
  
   private _updateFormData() {
     const _this = this
     for (var g = 0; g < this.group.scorecards.length; g++) {
       var this_score = _this.group.scorecards[g].holes.find((hl) => {return hl.number == _this.hole}).score
       if (_this.dataForm) {
         _this.dataForm.get('allScores')['controls'][g].get("newScore").setValue(this_score);
       }
     }

   }
  
  
  getHoleFormGroup(index, hole) {
    return this.dataForm.get('allScores')['controls'][index].get('scores')['controls'].find((ctrl)=>{return ctrl['controls'].hole.value == hole})
  }
  getGolfers() {
    return this.dataForm.get('golferScores')['controls'];
  }
  getAllScores() {
    return this.dataForm.get('allScores')['controls'];
  }
  
  getScores(form, hole) {
    return form.controls.scores.controls.filter((ctrl)=>{return ctrl['controls'].hole.value == hole})
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
    const outputArr: ScoreEntry[] = []
    
    for (var g=0; g<_this.group.scorecards.length; g++) {
      const outputObj: ScoreEntry = {
        hole: _this.hole,
        golfer: this.group.scorecards[g].golfer, 
        score:  _this.dataForm.get('allScores')['controls'].find((fg)=> {return fg['controls'].golfer.value._id == this.group.scorecards[g].golfer._id}).value.newScore
      }
      outputArr.push(outputObj);
    }
    return outputArr;
  }
  

  onSubmit() {
    this.submitting = true;
    this.submitObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitSub = this.api
        .postData$('golf-groups', [this.submitObj])
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitSub = this.api
        .editScores$(this.round._id, this.group._id, this.submitObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }
  



  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to Golfer detail
    this.router.navigate(['/']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
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




