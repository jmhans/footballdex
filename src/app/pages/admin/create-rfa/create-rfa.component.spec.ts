import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRfaComponent } from './create-rfa.component';

describe('CreateRfaComponent', () => {
  let component: CreateRfaComponent;
  let fixture: ComponentFixture<CreateRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
