import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TeamOwnerModel, FormTeamOwnerModel } from './../../../core/models/teamOwners.model';
import { ApiService } from './../../../core/services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-team-owner-form',
  templateUrl: './team-owner-form.component.html',
  styleUrls: ['./team-owner-form.component.scss']
})
export class TeamOwnerFormComponent implements OnInit, OnDestroy {
  @Input() teamOwner: TeamOwnerModel;
  
  isEdit: boolean;
  // FormBuilder form
  dataForm: FormGroup;
  // Model storing initial form values
  formObj: FormTeamOwnerModel;
  // Form validation and disabled logic

  formChangeSub: Subscription;
  // Form submission
  submitObj: TeamOwnerModel;
  submitSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  
  
  // Set up errors object
  formErrors: any = {
    name: '',
    teamname: ''
  }
  
  validationMessages: any = {
      name: {
        required: `Name is <strong>required</strong>.`
      },
      teamname: {
        required: `Team Name is <strong>required</strong>.`
      }
  }
  
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.formErrors;
    this.isEdit = !!this.teamOwner;
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
      return new FormTeamOwnerModel(null, null);
    } else {
      return new FormTeamOwnerModel(
        this.teamOwner.name,
        this.teamOwner.teamname
      );
    }
  }
  
  

  private _buildForm() {
    this.dataForm = this.fb.group({
      name: [this.formObj.name, [
        Validators.required
      ]],
      teamname: [this.formObj.teamname,
        Validators.required
      ]
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

    this._onValueChanged();
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
    return new TeamOwnerModel(
      this.dataForm.get('name').value, // Need to think about these - probably need to extract _id from these differently.  
      this.dataForm.get('teamname').value,
      this.teamOwner ? this.teamOwner._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitSub = this.api
        .postData$('teamOwners', this.submitObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitSub = this.api
        .editData$('teamOwners', this.teamOwner._id, this.submitObj)
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
    this.router.navigate(['/admin']);
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



