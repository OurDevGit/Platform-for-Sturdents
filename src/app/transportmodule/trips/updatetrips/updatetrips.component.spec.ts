import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetripsComponent } from './updatetrips.component';

describe('UpdatetripsComponent', () => {
  let component: UpdatetripsComponent;
  let fixture: ComponentFixture<UpdatetripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
