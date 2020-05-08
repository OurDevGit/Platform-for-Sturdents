import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignusertocynosureComponent } from "./assignusertocynosure.component";

describe("AssignusertocynosureComponent", () => {
  let component: AssignusertocynosureComponent;
  let fixture: ComponentFixture<AssignusertocynosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignusertocynosureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignusertocynosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
