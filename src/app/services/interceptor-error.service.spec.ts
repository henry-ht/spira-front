import { TestBed } from '@angular/core/testing';

import { InterceptorErrorService } from './interceptor-error.service';

describe('InterceptorErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptorErrorService = TestBed.get(InterceptorErrorService);
    expect(service).toBeTruthy();
  });
});
