import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewstudentparentComponent } from "./viewstudentparent.component";

describe("ViewstudentparentComponent", () => {
  let component: ViewstudentparentComponent;
  let fixture: ComponentFixture<ViewstudentparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewstudentparentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstudentparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
