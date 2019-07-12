import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardFormComponent } from './scorecard-form.component';

describe('ScorecardFormComponent', () => {
  let component: ScorecardFormComponent;
  let fixture: ComponentFixture<ScorecardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
