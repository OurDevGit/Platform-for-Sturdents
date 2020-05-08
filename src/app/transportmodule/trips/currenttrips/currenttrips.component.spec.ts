import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenttripsComponent } from './currenttrips.component';

describe('CurrenttripsComponent', () => {
  let component: CurrenttripsComponent;
  let fixture: ComponentFixture<CurrenttripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenttripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenttripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
