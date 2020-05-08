import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddriversComponent } from './adddrivers.component';

describe('AdddriversComponent', () => {
  let component: AdddriversComponent;
  let fixture: ComponentFixture<AdddriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
