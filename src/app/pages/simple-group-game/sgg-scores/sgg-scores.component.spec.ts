import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SggScoresComponent } from './sgg-scores.component';

describe('SggScoresComponent', () => {
  let component: SggScoresComponent;
  let fixture: ComponentFixture<SggScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SggScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SggScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
