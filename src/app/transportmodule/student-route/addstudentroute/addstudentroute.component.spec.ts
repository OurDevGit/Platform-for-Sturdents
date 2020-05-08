import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentrouteComponent } from './addstudentroute.component';

describe('AddstudentrouteComponent', () => {
  let component: AddstudentrouteComponent;
  let fixture: ComponentFixture<AddstudentrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstudentrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstudentrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
