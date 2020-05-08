import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwaypointsComponent } from './listwaypoints.component';

describe('ListwaypointsComponent', () => {
  let component: ListwaypointsComponent;
  let fixture: ComponentFixture<ListwaypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListwaypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwaypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
