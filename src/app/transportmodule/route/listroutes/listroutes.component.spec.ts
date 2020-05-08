import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListroutesComponent } from './listroutes.component';

describe('ListroutesComponent', () => {
  let component: ListroutesComponent;
  let fixture: ComponentFixture<ListroutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListroutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
