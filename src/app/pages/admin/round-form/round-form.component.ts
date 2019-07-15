
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray,  FormControl} from '@angular/forms';
import { RoundModel, FormRoundModel } from './../../../core/models/round.model';
import { ApiService } from './../../../core/services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.scss']
})
export class RoundFormComponent implements OnInit, OnDestroy {
  @Input() round: RoundModel;
  
  isEdit: boolean;
  // FormBuilder form
  dataForm: FormGroup;
  // Model storing initial form values
  formObj: FormRoundModel;
  // Form validation and disabled logic
  
  formGroupsArray: FormArray;
  formGolfersArray: FormArray;
  
  
  formChangeSub: Subscription;
  // Form submission
  submitObj: RoundModel;
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
    weirdgroups: '',
    date: '', 
    course: ''
  }
  
  validationMessages: any = {
      description: {
        required: `Description is <strong>required</strong>.`
      },
      group: {
        required: `Group is <strong>required</strong>.`
      }, 
      date: {
        required: 'Date is <strong>required</strong>'
      }, 
      course: {
        required: 'Course is <strong>required</strong>'
      }
    }
  
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.formErrors;
    this.isEdit = !!this.round;
    this.submitBtnText = this.isEdit ? 'Update Data' : 'Create Data';
    // Set initial form data
    this.formObj = this._setFormObj();
    // Use FormBuilder to construct the form
    
    this._buildForm();
    

  }

  
  private _setFormObj() {
    if (!this.isEdit) {
      // If creating a new Golfer, create new
      // FormGolferModel with default null data
      return new FormRoundModel(null,[{golfer: 'somename', otherField: 'somevalue'}] /* Create a new 'group' and put in here*/,null, null);
    } else {
      return new FormRoundModel(
        this.round.description,
        this.round.groups, 
        this.round.date, 
        this.round.course
      );
    }
  }


  

  private _buildForm() {
    
    this.formGroupsArray = this.fb.array(this.formObj.groups.map((grp) => this.createFormGroup(grp)), this.minLengthArray(1));

    this.dataForm = this.fb.group({
      description: [this.formObj.description, [
        Validators.required
      ]],
      date: [this.formObj.date,
        Validators.required
      ],
      course: [this.formObj.course,
        Validators.required
      ], 
      weirdgroups: [this.formGroupsArray],
      groups: this.fb.array([
        this.initGroup(),
      ]),
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

  
  createGroupFromData(grp): FormGroup {
    
    return this.fb.group({
      golfers: this.fb.array([grp.golfers.map((golfer) => this.createGolferFromData(golfer))])
    })
    
    
//    return this.fb.array(grp.golfers.map((golfer)=> this.createGolferFromData(golfer)), this.minLengthArray(1));
  }
  
  createFormGroup(grp): FormGroup {
    return this.fb.group({
      golfer: [grp.golfer],
      otherField: [grp.otherField]
    })
  }
  

  
  createGolferFromData(golfer): FormGroup {
    return this.fb.group({
      golfer: golfer, 
      handicap_strokes: golfer.handicap_strokes
    })
  }
  
  
  createGolfer(): FormGroup {
    return this.fb.group({
      golfer: '',
      handicap_strokes: 0
    });
  }
  
  createGroup(): FormGroup {
    
    
    return this.fb.group({
      golfer: ['man this sucks'], 
      otherField: ['like seriously.']
    }); //this.fb.array([this.createGolfer()], this.minLengthArray(1))});
  }
  
  
  addGolferToGroup(grp): void {
    grp.push(this.createGolfer());
  }
  
  addNewGroup(): void {
    //this.formGroupsArray = this.dataForm.get('groups') as FormArray;
    this.formGroupsArray.push(this.createGroup());
    //this.formGroupsArray.push(this.createFormGroup());
  }
  getWeirdGroups(form) {

    return form.controls.weirdgroups.controls;
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

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new GolferModel for submission
    return new RoundModel(
      this.dataForm.get('description').value, // Need to think about these - probably need to extract _id from these differently.  
      this.dataForm.get('weirdgroups').value,
      this.dataForm.get('date').value,
      this.dataForm.get('course').value,
      this.round ? this.round._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitSub = this.api
        .postData$('rounds', [this.submitObj])
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitSub = this.api
        .editData$('rounds', this.round._id, [this.submitObj])
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }
  
  
  
  initGroup() {
    return this.fb.group({
      groupTitle: [''],
      golfers: this.fb.array([
        this.initGolfer()
        ])
    });
  }
  initGolfer() {
    return this.fb.group({
      golferName: ['something'],
      golferHandicap: [0]
    });
  }

  addGroup() {
    const control = <FormArray>this.dataForm.get('groups');
    control.push(this.initGroup());
  }

  addGolfer(j) {
    console.log(j);
    const control = <FormArray>this.dataForm.get('groups')['controls'][j].get('golfers');
   // console.log(control);
    control.push(this.initGolfer());
    
  }

  getGroups(form) {
    //console.log(form.get('sections').controls);
    return form.controls.groups['controls'];
  }
  getGolfers(form) {
   //console.log(form.controls.questions.controls);
    return form.controls.golfers['controls'];
  }


  removeGolfer(j){
     const control = <FormArray>this.dataForm.get('groups')['controls'][j].get('golfers');
     control.removeAt(j);
  }

  removeGroup(i){
   const control = <FormArray>this.dataForm.get('groups');
   control.removeAt(i);

  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to Golfer detail
    this.router.navigate(['/home']);
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
