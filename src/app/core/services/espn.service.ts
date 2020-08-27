import { Injectable } from '@angular/core';
import { Client } from 'espn-fantasy-football-api';


@Injectable({
  providedIn: 'root'
})
export class EspnService {
private myESPNClient = new Client({ leagueId: 573433 });
private ESPN_S2 = "AECRmrWNdpyaGVwLdqER0ar%2F7kOm3D9VN8NuV1YfL4ZDl1A2CVpyjGDqgF8h1rjKNV%2F5UL9Qv2iRjnEacOqn9aHUSfJpyUUnveWk287a2RZYb7Oi8jB8sA8mRCe8PZapMpkO029qipMboTgOUdbTQK5cvTUAvNX49ymVRHVo7Yszy4YClhIvMjqkEvN%2BENrqxT4D4NgSS6rUrCXx1dy01AOCU3lajmaHFkTXiVz2xHgAii3bAsXpLOQWAzEJbFKNMf6DSqS1nCcIU66HUmDwMgerxbLU%2FLBYSY5TswjlrfNKDA%3D%3D";
private SWID = "{C265EE8D-6817-49A1-842A-5585190D355E}";
  
  
  constructor() {
    this.myESPNClient.setCookies({ espnS2: this.ESPN_S2, SWID: this.SWID});
  }
  
}
