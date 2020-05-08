import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CreatecynosureuseComponent } from "./createcynosureuse.component";

describe("CreatecynosureuseComponent", () => {
  let component: CreatecynosureuseComponent;
  let fixture: ComponentFixture<CreatecynosureuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecynosureuseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecynosureuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
