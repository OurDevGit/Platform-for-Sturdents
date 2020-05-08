import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NumberofschoolswithoutusersComponent } from "./numberofschoolswithoutusers.component";

describe("NumberofschoolswithoutusersComponent", () => {
  let component: NumberofschoolswithoutusersComponent;
  let fixture: ComponentFixture<NumberofschoolswithoutusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberofschoolswithoutusersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberofschoolswithoutusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
