import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateroutesComponent } from './updateroutes.component';

describe('UpdateroutesComponent', () => {
  let component: UpdateroutesComponent;
  let fixture: ComponentFixture<UpdateroutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateroutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
