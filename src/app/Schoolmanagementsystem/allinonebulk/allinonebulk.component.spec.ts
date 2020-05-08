import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllinonebulkComponent } from "./allinonebulk.component";

describe("AllinonebulkComponent", () => {
  let component: AllinonebulkComponent;
  let fixture: ComponentFixture<AllinonebulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllinonebulkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllinonebulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
