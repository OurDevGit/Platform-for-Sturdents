import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditstudentparentComponent } from "./editstudentparent.component";

describe("EditstudentparentComponent", () => {
  let component: EditstudentparentComponent;
  let fixture: ComponentFixture<EditstudentparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditstudentparentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstudentparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
