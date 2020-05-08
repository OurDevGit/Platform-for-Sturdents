import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvehiclesComponent } from './listvehicles.component';

describe('ListvehiclesComponent', () => {
  let component: ListvehiclesComponent;
  let fixture: ComponentFixture<ListvehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
