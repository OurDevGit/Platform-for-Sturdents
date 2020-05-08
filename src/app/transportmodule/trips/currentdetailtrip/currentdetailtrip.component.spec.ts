import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentdetailtripComponent } from './currentdetailtrip.component';

describe('CurrentdetailtripComponent', () => {
  let component: CurrentdetailtripComponent;
  let fixture: ComponentFixture<CurrentdetailtripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentdetailtripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentdetailtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
