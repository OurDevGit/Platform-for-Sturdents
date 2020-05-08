import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvehiclesComponent } from './viewvehicles.component';

describe('ViewvehiclesComponent', () => {
  let component: ViewvehiclesComponent;
  let fixture: ComponentFixture<ViewvehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
