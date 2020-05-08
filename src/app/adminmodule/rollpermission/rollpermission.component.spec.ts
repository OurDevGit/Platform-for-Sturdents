import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RollpermissionComponent } from "./rollpermission.component";

describe("RollpermissionComponent", () => {
  let component: RollpermissionComponent;
  let fixture: ComponentFixture<RollpermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RollpermissionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
