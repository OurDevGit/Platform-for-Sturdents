import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateacademicComponent } from "./updateacademic.component";

describe("UpdateacademicComponent", () => {
  let component: UpdateacademicComponent;
  let fixture: ComponentFixture<UpdateacademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateacademicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateacademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
