import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListstudentparentComponent } from "./liststudentparent.component";

describe("ListstudentparentComponent", () => {
  let component: ListstudentparentComponent;
  let fixture: ComponentFixture<ListstudentparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListstudentparentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstudentparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
