import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorytripsComponent } from './historytrips.component';

describe('HistorytripsComponent', () => {
  let component: HistorytripsComponent;
  let fixture: ComponentFixture<HistorytripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorytripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorytripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
