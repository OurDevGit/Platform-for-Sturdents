import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BlukuploadlogComponent } from "./blukuploadlog.component";

describe("BlukuploadlogComponent", () => {
  let component: BlukuploadlogComponent;
  let fixture: ComponentFixture<BlukuploadlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlukuploadlogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlukuploadlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
