import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOwnerComponent } from './team-owner.component';

describe('TeamOwnerComponent', () => {
  let component: TeamOwnerComponent;
  let fixture: ComponentFixture<TeamOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
