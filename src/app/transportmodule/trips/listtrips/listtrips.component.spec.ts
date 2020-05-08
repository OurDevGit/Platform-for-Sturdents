import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtripsComponent } from './listtrips.component';

describe('ListtripsComponent', () => {
  let component: ListtripsComponent;
  let fixture: ComponentFixture<ListtripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
