import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedriversComponent } from './updatedrivers.component';

describe('UpdatedriversComponent', () => {
  let component: UpdatedriversComponent;
  let fixture: ComponentFixture<UpdatedriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
