import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsassignComponent } from './psassign.component';

describe('PsassignComponent', () => {
  let component: PsassignComponent;
  let fixture: ComponentFixture<PsassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
