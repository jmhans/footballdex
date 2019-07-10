
import { Injectable } from '@angular/core';

@Injectable()
export class DataFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    golfer: '',
    handicap: ''
  };
  
  constructor() {
    this.validationMessages = {
      golfer: {
        required: `Golfer is <strong>required</strong>.`
      },
      handicap: {
        required: `Handicap is <strong>required</strong>.`
      }
    };
  }

}
