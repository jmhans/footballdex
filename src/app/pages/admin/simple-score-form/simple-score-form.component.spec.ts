import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleScoreFormComponent } from './simple-score-form.component';

describe('SimpleScoreFormComponent', () => {
  let component: SimpleScoreFormComponent;
  let fixture: ComponentFixture<SimpleScoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleScoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleScoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
