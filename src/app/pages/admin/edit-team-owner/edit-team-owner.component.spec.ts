import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamOwnerComponent } from './edit-team-owner.component';

describe('EditTeamOwnerComponent', () => {
  let component: EditTeamOwnerComponent;
  let fixture: ComponentFixture<EditTeamOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
