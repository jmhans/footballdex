import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SggDetailsComponent } from './sgg-details.component';

describe('SggDetailsComponent', () => {
  let component: SggDetailsComponent;
  let fixture: ComponentFixture<SggDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SggDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SggDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
