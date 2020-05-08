import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgotresetComponent } from "./forgotreset.component";

describe("ForgotresetComponent", () => {
  let component: ForgotresetComponent;
  let fixture: ComponentFixture<ForgotresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotresetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
