import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGroupGameComponent } from './simple-group-game.component';

describe('SimpleGroupGameComponent', () => {
  let component: SimpleGroupGameComponent;
  let fixture: ComponentFixture<SimpleGroupGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGroupGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGroupGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
