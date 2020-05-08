import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NoncynosureuserComponent } from "./noncynosureuser.component";

describe("NoncynosureuserComponent", () => {
  let component: NoncynosureuserComponent;
  let fixture: ComponentFixture<NoncynosureuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoncynosureuserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoncynosureuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
