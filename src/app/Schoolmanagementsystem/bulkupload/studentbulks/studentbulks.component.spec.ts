import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentbulksComponent } from "./studentbulks.component";

describe("StudentbulksComponent", () => {
  let component: StudentbulksComponent;
  let fixture: ComponentFixture<StudentbulksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentbulksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentbulksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
