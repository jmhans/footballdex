import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOwnersComponent } from './team-owners.component';

describe('TeamOwnersComponent', () => {
  let component: TeamOwnersComponent;
  let fixture: ComponentFixture<TeamOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
