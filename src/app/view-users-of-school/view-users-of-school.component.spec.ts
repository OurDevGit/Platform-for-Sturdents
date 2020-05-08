import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewUsersOfSchoolComponent } from "./view-users-of-school.component";

describe("ViewUsersOfSchoolComponent", () => {
  let component: ViewUsersOfSchoolComponent;
  let fixture: ComponentFixture<ViewUsersOfSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUsersOfSchoolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersOfSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
