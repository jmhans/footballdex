import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subadmin',
  templateUrl: './subadmin.component.html',
  styleUrls: ['./subadmin.component.scss']
})
export class SubadminComponent implements OnInit {
  @Input() model: any;
  
  constructor() { }

  ngOnInit() {
    
  }

}
