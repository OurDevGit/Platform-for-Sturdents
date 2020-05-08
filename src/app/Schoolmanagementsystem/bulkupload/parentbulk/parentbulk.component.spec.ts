import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ParentbulkComponent } from "./parentbulk.component";

describe("ParentbulkComponent", () => {
  let component: ParentbulkComponent;
  let fixture: ComponentFixture<ParentbulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentbulkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
