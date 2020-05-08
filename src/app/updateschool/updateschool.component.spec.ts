import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateschoolComponent } from "./updateschool.component";

describe("UpdateschoolComponent", () => {
  let component: UpdateschoolComponent;
  let fixture: ComponentFixture<UpdateschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateschoolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
