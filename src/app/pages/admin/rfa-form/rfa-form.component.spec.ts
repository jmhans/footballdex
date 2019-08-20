import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfaFormComponent } from './rfa-form.component';

describe('RfaFormComponent', () => {
  let component: RfaFormComponent;
  let fixture: ComponentFixture<RfaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
