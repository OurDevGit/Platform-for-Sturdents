import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignusertoschoolComponent } from "./assignusertoschool.component";

describe("AssignusertoschoolComponent", () => {
  let component: AssignusertoschoolComponent;
  let fixture: ComponentFixture<AssignusertoschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignusertoschoolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignusertoschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
