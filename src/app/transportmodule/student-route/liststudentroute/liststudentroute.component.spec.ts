import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstudentrouteComponent } from './liststudentroute.component';

describe('ListstudentrouteComponent', () => {
  let component: ListstudentrouteComponent;
  let fixture: ComponentFixture<ListstudentrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstudentrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstudentrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
