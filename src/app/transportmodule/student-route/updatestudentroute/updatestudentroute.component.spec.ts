import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestudentrouteComponent } from './updatestudentroute.component';

describe('UpdatestudentrouteComponent', () => {
  let component: UpdatestudentrouteComponent;
  let fixture: ComponentFixture<UpdatestudentrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatestudentrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatestudentrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
