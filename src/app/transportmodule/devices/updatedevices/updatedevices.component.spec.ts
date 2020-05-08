import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedevicesComponent } from './updatedevices.component';

describe('UpdatedevicesComponent', () => {
  let component: UpdatedevicesComponent;
  let fixture: ComponentFixture<UpdatedevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
