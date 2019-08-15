import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOwnerFormComponent } from './team-owner-form.component';

describe('TeamOwnerFormComponent', () => {
  let component: TeamOwnerFormComponent;
  let fixture: ComponentFixture<TeamOwnerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOwnerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
