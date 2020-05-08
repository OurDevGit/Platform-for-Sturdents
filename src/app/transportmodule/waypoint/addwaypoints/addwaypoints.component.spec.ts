import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwaypointsComponent } from './addwaypoints.component';

describe('AddwaypointsComponent', () => {
  let component: AddwaypointsComponent;
  let fixture: ComponentFixture<AddwaypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwaypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwaypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
