
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray,  FormControl} from '@angular/forms';
import { RoundModel, FormRoundModel } from './../../../core/models/round.model';
import { ApiService } from './../../../core/services/api.service';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
  
  availableGolfers: any[];
  filteredGolfers: any[];
  loading: boolean;
  errors: boolean;
  golfersSub: Subscription;
  
  filteredGolfersToo: Observable<any[]>[] = [];
  
  availableCourses: any[];
  filteredCourses: Observable<any[]>;
  coursesSub: Subscription;
  
  
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
    groups: '',
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

    // Use FormBuilder to construct the form
    this._getAllGolfers();
    this._getCourses();
    this.formObj = this._setFormObj();
    this._buildForm();
    

  }
  
  private _getAllGolfers() {
    this.loading = true;
    // Get all (admin) events
    this.golfersSub = this.api
      .getData$('golfers')
      .subscribe(
        res => {
          this.availableGolfers = res;
          this.filteredGolfers = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  
  private _getCourses() {
    this.loading = true;
    this.coursesSub = this.api
      .getData$('courses')
      .subscribe(
        res => {
            this.availableCourses = res;
          
            this.filteredCourses = this.dataForm.get('course').valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
            this.loading = false;
        }, 
        err => {
          console.error(err);
          this.loading = false;
          this.error = true
        }
    );
  }

  private _setFormObj() {
    if (!this.isEdit) {
      // If creating a new Golfer, create new
      // FormGolferModel with default null data
      return new FormRoundModel(null,[this.initGroupData()] /* Create a new 'group' and put in here*/,null, null, null);
    } else {
      return new FormRoundModel(
        this.round.description,
        this.round.groups, 
        this.round.date, 
        this.round.course,
        this.round.score_type
      );
    }
  }


  private _buildForm() {
    
  
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
      score_type: [this.formObj.score_type, Validators.required]
    });
    
   this.dataForm.addControl('groups',this._createFormGroups());
    


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
    this.updateGolferLists();
  }
  
  private _filter(value: any): any[] {
    
    const filterValue = value.name ? value.name.toLowerCase() : value;
    return this.availableCourses.filter(course => course.name.toLowerCase().includes(filterValue));
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
    
    var groupObj = this.dataForm.get('groups').value.map((grp) => this._getGroupSubmitObj(grp));
    
    return new RoundModel(
      this.dataForm.get('description').value, // Need to think about these - probably need to extract _id from these differently.  
      groupObj,
      this.dataForm.get('date').value,
      this.dataForm.get('course').value._id, 
      this.dataForm.get('score_type').value,
      this.round ? this.round._id : null
    );
  }
  
  getTees() {
    if (!this.dataForm.get('course').value) {
      return [];
    } 
      return this.dataForm.get('course').value.tees;  

  }
  
  
  
  private _getGroupSubmitObj(grp) {
    
    var courseTees = this.dataForm.get('course').value.tees;
    
    var sc = grp.golfers.map((golfer) => { return { golfer: golfer.golferName._id, 
                                           handicap_strokes: golfer.golferHandicap,
                                           tee: golfer.golferTee.name,
                                           holes: golfer.golferTee.holes};})
    return { groupTitle: grp.groupTitle, scorecards: sc, groupScores: []};
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
  
  
  _createFormGroups() {
    if (this.formObj.groups.length>0) {
      return this.fb.array(this.formObj.groups.map((grp) => this.createGroup(grp))/*[
        this.initGroup(),
      ]*/)
    } else {
      return this.fb.array([this.initGroup()])
    }
  }
  
  createGroup(grp) {
    return this.fb.group({
      groupTitle: [grp.groupTitle], 
      golfers: this.fb.array(grp.scorecards.map((sc) => this._createGolfer(sc)))
    })
  }
  
  initGroupData() {
    return {groupTitle: '', 
            scorecards: [this.initScorecard()]
           }
  }
  
  initScorecard() {
    return {
      golfer: '', 
      handicap_strokes: 0, 
      tee: ''
           }
  }
  
  
  initGroup() {
    return this.createGroup(this.initGroupData());
  }
  
  _createGolfer(scorecard) {
    return this.fb.group({
      golferName: [scorecard.golfer], 
      golferHandicap: [scorecard.handicap_strokes], 
      golferTee: [this._translateTee(scorecard.teeName)]
    })
  }
  
  _translateTee(teeName:string) {
    if (this.dataForm) {
      if (this.dataForm.get('course').value) {
        return this.dataForm.get('course').value.tees.find((t) => {return (t.name == teeName)})
      }
    }
    return teeName;
  }
  
  initGolfer() {
    return this._createGolfer(this.initScorecard());
  }

  addGroup() {
    const control = <FormArray>this.dataForm.get('groups');
    control.push(this.initGroup());
  }
  
  updateGolferLists() {
    for(var grp=0; grp<this.dataForm.get('groups')['controls'].length; grp++) {
      const control = this.dataForm.get('groups')['controls'][grp].get('golfers');
      for (var golfer=0; golfer<control['controls'].length; golfer++) {
        var golferCtrl = control['controls'][golfer];
        this.filteredGolfersToo[golfer] = golferCtrl.valueChanges
          .pipe(       
          startWith(''),
          map(value => this._filter(value))
        
        )
      }
    }
    
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
  
  displayFn(val: any) {
    return val ? val.nickname : val;
  }
  
  displayCourseFn(val: any) {
    return val ? val.name : val
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
