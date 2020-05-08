import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewrfidComponent } from "./newrfid.component";

describe("NewrfidComponent", () => {
  let component: NewrfidComponent;
  let fixture: ComponentFixture<NewrfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewrfidComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
