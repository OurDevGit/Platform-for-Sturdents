import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateparentComponent } from "./updateparent.component";

describe("UpdateparentComponent", () => {
  let component: UpdateparentComponent;
  let fixture: ComponentFixture<UpdateparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateparentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
