import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwaypointsComponent } from './viewwaypoints.component';

describe('ViewwaypointsComponent', () => {
  let component: ViewwaypointsComponent;
  let fixture: ComponentFixture<ViewwaypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewwaypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewwaypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
