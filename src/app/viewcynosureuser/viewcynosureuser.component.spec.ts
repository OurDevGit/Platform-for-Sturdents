import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewcynosureuserComponent } from "./viewcynosureuser.component";

describe("ViewcynosureuserComponent", () => {
  let component: ViewcynosureuserComponent;
  let fixture: ComponentFixture<ViewcynosureuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcynosureuserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcynosureuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
