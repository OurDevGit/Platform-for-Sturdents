import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewschooluserComponent } from "./viewschooluser.component";

describe("ViewschooluserComponent", () => {
  let component: ViewschooluserComponent;
  let fixture: ComponentFixture<ViewschooluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewschooluserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewschooluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
