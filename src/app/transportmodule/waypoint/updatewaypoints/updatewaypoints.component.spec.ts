import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatewaypointsComponent } from './updatewaypoints.component';

describe('UpdatewaypointsComponent', () => {
  let component: UpdatewaypointsComponent;
  let fixture: ComponentFixture<UpdatewaypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatewaypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatewaypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
