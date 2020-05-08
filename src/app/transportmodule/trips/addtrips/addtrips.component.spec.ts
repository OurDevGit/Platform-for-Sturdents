import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtripsComponent } from './addtrips.component';

describe('AddtripsComponent', () => {
  let component: AddtripsComponent;
  let fixture: ComponentFixture<AddtripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
