import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-team-owner',
  templateUrl: './create-team-owner.component.html',
  styleUrls: ['./create-team-owner.component.scss']
})
export class CreateTeamOwnerComponent implements OnInit {
  pageTitle = "Create Owner";
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

}
