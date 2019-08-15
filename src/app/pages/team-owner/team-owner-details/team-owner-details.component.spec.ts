import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOwnerDetailsComponent } from './team-owner-details.component';

describe('TeamOwnerDetailsComponent', () => {
  let component: TeamOwnerDetailsComponent;
  let fixture: ComponentFixture<TeamOwnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOwnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
