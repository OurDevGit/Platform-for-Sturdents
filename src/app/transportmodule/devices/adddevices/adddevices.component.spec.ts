import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddevicesComponent } from './adddevices.component';

describe('AdddevicesComponent', () => {
  let component: AdddevicesComponent;
  let fixture: ComponentFixture<AdddevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
