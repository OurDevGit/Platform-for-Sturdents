import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdevicesComponent } from './viewdevices.component';

describe('ViewdevicesComponent', () => {
  let component: ViewdevicesComponent;
  let fixture: ComponentFixture<ViewdevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
