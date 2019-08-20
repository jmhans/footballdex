import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRfaComponent } from './edit-rfa.component';

describe('EditRfaComponent', () => {
  let component: EditRfaComponent;
  let fixture: ComponentFixture<EditRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
