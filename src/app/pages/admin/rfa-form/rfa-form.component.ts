import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UtilsService } from './../../../core/services/utils.service';
import { RFAModel, FormRFAModel } from './../../../core/models/rfa.model';
import { TeamOwnerModel} from './../../../core/models/teamOwners.model';
import { rfa_data } from './../../../core/models/fbd.rfa';

import { ApiService } from './../../../core/services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfa-form',
  templateUrl: './rfa-form.component.html',
  styleUrls: ['./rfa-form.component.scss']
})
export class RfaFormComponent implements OnInit, OnDestroy {

 @Input() rfa: RFAModel;
  rfa_data: any[];
  owners: TeamOwnerModel[];
  ownersListSub: Subscription;
  
  filteredPlayers: any;
  
  isEdit: boolean;
  // FormBuilder form
  dataForm: FormGroup;
  // Model storing initial form values
  formObj: FormRFAModel;
  // Form validation and disabled logic

  formChangeSub: Subscription;
  // Form submission
  submitObj: RFAModel;
  submitSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  loading: boolean;
  
  
  // Set up errors object
  formErrors: any = {
    owner: '',
    player: '',
    adv:''
  }
  
  validationMessages: any = {
      owner: {
        required: `Owner is <strong>required</strong>.`
      },
      player: {
        required: `Name is <strong>required</strong>.`
      }
  }
  
  
  constructor(
    private fb: FormBuilder,
    public utils: UtilsService,
    private api: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.formErrors;
    this.isEdit = !!this.rfa;
    this.submitBtnText = this.isEdit ? 'Update Data' : 'Create Data';
    // Set initial form data
    this.formObj = this._setFormObj();
    // Use FormBuilder to construct the form
    this.rfa_data = rfa_data.data;
    this._getTeamOwnersList();
    this._buildForm();
  }

  
  private _setFormObj() {
    if (!this.isEdit) {
      // If creating a new Golfer, create new
      // FormGolferModel with default null data
      return new FormRFAModel(null, null, null);
    } else {
      return new FormRFAModel(
        this.rfa.owner,
        this.rfa.name, 
        this.rfa.adv
      );
    }
  }
  
private _getTeamOwnersList() {

    this.loading = true;
    // Get future, public events
    this.ownersListSub = this.api
      .getData$('teamOwners')
      .subscribe(
        res => {
          this.owners = res;
          this.loading = false;

        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
  

  private _compOwner(o1: any, o2: any) : boolean{
    return (o1 && o2 ? o1._id == o2._id : o1===o2);
  }
  
  private _compPlyr(p1: any, p2: any) : boolean {
    return (p1 && p2 ? p1.fullName == p2.fullName : p1 === p2);
  }
  

  private _buildForm() {
    this.dataForm = this.fb.group({
      owner: [this.formObj.owner, [
        Validators.required
      ]],
      player: [(this.formObj.name == null? null : this.rfa_data.find((plyr) => {return plyr.fullName == this.formObj.name})),
        Validators.required
      ], 
      adv: [this.formObj.adv]
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
  
  this.filteredPlayers = this._getFilteredPlayers(this.dataForm.get('owner').value);
  }

  private _getSubmitObj() {

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new GolferModel for submission
    return new RFAModel(
      this.dataForm.get('owner').value._id, // Need to think about these - probably need to extract _id from these differently.  
      this.dataForm.get('name').value.fullName,
      this.dataForm.get('name').value.ADV,
      this.rfa ? this.rfa._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitSub = this.api
        .postData$('rfas', this.submitObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitSub = this.api
        .editData$('rfas', this.rfa._id, this.submitObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }
  
  private _getFilteredPlayers(new_owner) {
    if (new_owner) {
      return this.rfa_data.filter((plyr) => {return (plyr.TeamId == new_owner.espn_team_id)});
      } else return [];
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
    this.ownersListSub.unsubscribe();
  }

}
