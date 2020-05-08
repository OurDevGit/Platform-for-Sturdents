import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateschooluserComponent } from "./createschooluser.component";

describe("CreateschooluserComponent", () => {
  let component: CreateschooluserComponent;
  let fixture: ComponentFixture<CreateschooluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateschooluserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateschooluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
