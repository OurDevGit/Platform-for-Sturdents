import { TestBed, inject } from "@angular/core/testing";

import { ApiIntegService } from "./api-integ.service";

describe("ApiIntegService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiIntegService]
    });
  });

  it("should be created", inject(
    [ApiIntegService],
    (service: ApiIntegService) => {
      expect(service).toBeTruthy();
    }
  ));
});
