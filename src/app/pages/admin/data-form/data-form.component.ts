
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GolferModel, FormGolferModel } from './../../../core/models/golfer.model';
import { DataFormService } from './data-form.service';
import { ApiService } from './../../../core/services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'], 
  providers: [DataFormService]
})
export class DataFormComponent implements OnInit, OnDestroy {
  @Input() golfer: GolferModel;
  isEdit: boolean;
  // FormBuilder form
  golferForm: FormGroup;
  // Model storing initial form values
  formGolfer: FormGolferModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitGolferObj: GolferModel;
  submitGolferSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public df: DataFormService,
    public router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.df.formErrors;
    this.isEdit = !!this.golfer;
    this.submitBtnText = this.isEdit ? 'Update Golfer' : 'Create Golfer';
    // Set initial form data
    this.formGolfer = this._setFormGolfer();
    // Use FormBuilder to construct the form
    
    this._buildForm();
  }

  
  private _setFormGolfer() {
    if (!this.isEdit) {
      // If creating a new Golfer, create new
      // FormGolferModel with default null data
      return new FormGolferModel(null, null);
    } else {
      return new FormGolferModel(
        this.golfer.nickname,
        this.golfer.handicap
      );
    }
  }
  
  
  

  private _buildForm() {
    this.golferForm = this.fb.group({
      nickname: [this.formGolfer.nickname, [
        Validators.required
      ]],
      handicap: [this.formGolfer.handicap,
        Validators.required
      ]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.golferForm
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
      _markDirty(this.golferForm);
      
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.golferForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.df.validationMessages[field];
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
          _setErrMsgs(this.golferForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new GolferModel for submission
    return new GolferModel(
      this.golferForm.get('nickname').value, // Need to think about these - probably need to extract _id from these differently.  
      this.golferForm.get('handicap').value,
      this.golfer ? this.golfer._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitGolferObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitGolferSub = this.api
        .postData$('golfers', [this.submitGolferObj])
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitGolferSub = this.api
        .editData$('golfers', this.golfer._id, [this.submitGolferObj])
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
    this.golferForm.reset();
  }

  ngOnDestroy() {
    if (this.submitGolferSub) {
      this.submitGolferSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}
