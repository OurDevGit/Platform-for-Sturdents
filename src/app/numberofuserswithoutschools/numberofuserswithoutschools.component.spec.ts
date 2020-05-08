import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NumberofuserswithoutschoolsComponent } from "./numberofuserswithoutschools.component";

describe("NumberofuserswithoutschoolsComponent", () => {
  let component: NumberofuserswithoutschoolsComponent;
  let fixture: ComponentFixture<NumberofuserswithoutschoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberofuserswithoutschoolsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberofuserswithoutschoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
