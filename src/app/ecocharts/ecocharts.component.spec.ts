import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EcochartsComponent } from "./ecocharts.component";

describe("EcochartsComponent", () => {
  let component: EcochartsComponent;
  let fixture: ComponentFixture<EcochartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EcochartsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcochartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
