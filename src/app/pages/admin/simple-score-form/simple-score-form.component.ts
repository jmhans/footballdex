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
  selector: 'app-simple-score-form',
  templateUrl: './simple-score-form.component.html',
  styleUrls: ['./simple-score-form.component.scss']
})
export class SimpleScoreFormComponent implements OnInit, OnDestroy {

  @Input() groups: GroupModel[];
  @Output() scoreSubmitted: EventEmitter<any> = new EventEmitter();
 //@Input() round: RoundModel;
  groupId: string;
  group: GroupModel;
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


  ngOnInit() {

    this.querySub = this.route.queryParams
      .subscribe(queryParams => {
        this.hole = parseInt(queryParams['hole']) || 1;
        this.groupId = queryParams['groupId'] || '';
        if (this.groupId != '') {
          this.group = this.groups.find((grp) => {return grp._id == this.groupId});
        }
        this._updateFormData(); // Need to check if still needed. 
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
        return (this.group.groupScores.find((hl) => {return (hl.number == this.hole);})) || null    
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
    
    return {hole: _this.hole, groupScore: _this.dataForm.get('score').value, group: _this.group._id};
  }
  

  onSubmit() {
    this.submitting = true;
    this.scoreSubmitted.emit(this._getSubmitObj());
    
//     if (!this.isEdit) {
      
      
//       this.submitSub = this.api
//         .postData$('golf-groups', [this.submitObj])
//         .subscribe(
//           data => this._handleSubmitSuccess(data),
//           err => this._handleSubmitError(err)
//         );
//     } else {
//       this.submitSub = this.api
//         .editSimpleScores$(this.round._id, this.group._id, this.submitObj)
//         .subscribe(
//           data => this._handleSubmitSuccess(data),
//           err => this._handleSubmitError(err)
//         );
//     }
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




