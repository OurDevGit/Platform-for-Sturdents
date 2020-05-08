import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdaterfidComponent } from "./updaterfid.component";

describe("UpdaterfidComponent", () => {
  let component: UpdaterfidComponent;
  let fixture: ComponentFixture<UpdaterfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdaterfidComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaterfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
