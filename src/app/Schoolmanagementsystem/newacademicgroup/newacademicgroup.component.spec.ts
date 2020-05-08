import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewacademicgroupComponent } from "./newacademicgroup.component";

describe("NewacademicgroupComponent", () => {
  let component: NewacademicgroupComponent;
  let fixture: ComponentFixture<NewacademicgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewacademicgroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewacademicgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
