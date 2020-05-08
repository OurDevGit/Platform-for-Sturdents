import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolllistComponent } from "./rolllist.component";

describe("RolllistComponent", () => {
  let component: RolllistComponent;
  let fixture: ComponentFixture<RolllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolllistComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
