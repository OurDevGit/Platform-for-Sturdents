import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudentrouteComponent } from './viewstudentroute.component';

describe('ViewstudentrouteComponent', () => {
  let component: ViewstudentrouteComponent;
  let fixture: ComponentFixture<ViewstudentrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstudentrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstudentrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
