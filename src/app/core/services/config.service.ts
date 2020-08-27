import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  nominate_end_time: object = new Date("2020-08-31 11:59:59")
  bid_end_time: object = new Date("2020-09-06 23:59:59")
    
  
  constructor() { }
  
}
