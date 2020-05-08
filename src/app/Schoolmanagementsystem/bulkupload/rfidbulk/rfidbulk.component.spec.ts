import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RfidbulkComponent } from "./rfidbulk.component";

describe("RfidbulkComponent", () => {
  let component: RfidbulkComponent;
  let fixture: ComponentFixture<RfidbulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RfidbulkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
