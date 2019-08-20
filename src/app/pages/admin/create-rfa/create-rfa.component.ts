import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-rfa',
  templateUrl: './create-rfa.component.html',
  styleUrls: ['./create-rfa.component.scss']
})
export class CreateRfaComponent implements OnInit {
  pageTitle = "Create RFA";
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

}

