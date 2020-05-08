import { TestBed, inject } from "@angular/core/testing";

import { SchoolsService } from "./schools.service";

describe("SchoolsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolsService]
    });
  });

  it("should be created", inject(
    [SchoolsService],
    (service: SchoolsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
