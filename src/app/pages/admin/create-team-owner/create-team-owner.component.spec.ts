import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamOwnerComponent } from './create-team-owner.component';

describe('CreateTeamOwnerComponent', () => {
  let component: CreateTeamOwnerComponent;
  let fixture: ComponentFixture<CreateTeamOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
