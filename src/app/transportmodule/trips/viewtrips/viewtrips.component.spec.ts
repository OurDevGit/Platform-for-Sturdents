import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtripsComponent } from './viewtrips.component';

describe('ViewtripsComponent', () => {
  let component: ViewtripsComponent;
  let fixture: ComponentFixture<ViewtripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
