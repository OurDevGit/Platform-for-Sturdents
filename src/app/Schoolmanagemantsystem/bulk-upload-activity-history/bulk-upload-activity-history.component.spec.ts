import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BulkUploadActivityHistoryComponent } from "./bulk-upload-activity-history.component";

describe("BulkUploadActivityHistoryComponent", () => {
  let component: BulkUploadActivityHistoryComponent;
  let fixture: ComponentFixture<BulkUploadActivityHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkUploadActivityHistoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadActivityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
