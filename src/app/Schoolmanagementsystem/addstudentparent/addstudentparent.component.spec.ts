import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddstudentparentComponent } from "./addstudentparent.component";

describe("AddstudentparentComponent", () => {
  let component: AddstudentparentComponent;
  let fixture: ComponentFixture<AddstudentparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddstudentparentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstudentparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
