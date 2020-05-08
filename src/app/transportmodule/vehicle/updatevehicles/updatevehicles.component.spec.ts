import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevehiclesComponent } from './updatevehicles.component';

describe('UpdatevehiclesComponent', () => {
  let component: UpdatevehiclesComponent;
  let fixture: ComponentFixture<UpdatevehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatevehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatevehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
