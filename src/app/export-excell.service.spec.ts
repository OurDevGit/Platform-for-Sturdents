import { TestBed, inject } from "@angular/core/testing";

import { ExportExcellService } from "./export-excell.service";

describe("ExportExcellService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportExcellService]
    });
  });

  it("should be created", inject(
    [ExportExcellService],
    (service: ExportExcellService) => {
      expect(service).toBeTruthy();
    }
  ));
});
