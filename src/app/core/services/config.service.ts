import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  nominate_end_time: object = new Date("2020-08-31T11:59:59")
  bid_end_time: object = new Date("2020-09-07T12:00:00Z")
    
  
  constructor() { }
  
}
