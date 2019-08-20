import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfasComponent } from './rfas.component';

describe('RfasComponent', () => {
  let component: RfasComponent;
  let fixture: ComponentFixture<RfasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
