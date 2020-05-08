import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewschoolComponent } from "./newschool.component";

describe("NewschoolComponent", () => {
  let component: NewschoolComponent;
  let fixture: ComponentFixture<NewschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewschoolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
