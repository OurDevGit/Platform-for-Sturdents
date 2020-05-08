import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicGroupNameComponentComponent } from './acadamic-group-name-component.component';

describe('AcadamicGroupNameComponentComponent', () => {
  let component: AcadamicGroupNameComponentComponent;
  let fixture: ComponentFixture<AcadamicGroupNameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadamicGroupNameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadamicGroupNameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
